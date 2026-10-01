// Operator job: pre-build the candidate Dockerfile's dependency layers inside a microVM and export the guest Docker
// data dir, so a later image (guest/Dockerfile.warm) carries a warm BuildKit cache. Gate 5 runs then need no egress
// for unchanged `apk add` / `npm install` layers (HTTPS from nested build containers cannot trust the egress CA).
//
// Usage (inside the runner image; checkout tar.gz + output dir mounted):
//   node scripts/warm-guest.mjs /in/checkout.tgz /out/docker-data.tar.gz
// Egress here is intentionally wider (public 80/443, no TLS interception): this is a reviewed operator action that
// runs no candidate code, only the repository's own Dockerfile at a known commit.
import { Sandbox } from "microsandbox";
import { readFileSync } from "node:fs";
import { basename, dirname } from "node:path";
import { loadPolicy } from "../src/policy.js";

const [checkoutTgz, outTar] = process.argv.slice(2);
const policy = loadPolicy(readFileSync("/etc/sandbox/sandbox-policy.yaml", "utf8"));
const rule = (destination, protocols, ports) => ({ direction: "egress", destination, protocols, ports: ports.map((p) => ({ start: p, end: p })), action: "allow" });
const egress = {
  defaultEgress: "deny", defaultIngress: "deny",
  rules: [
    rule({ kind: "group", group: "host" }, ["udp", "tcp"], [53]),
    ...["loopback", "private", "link-local", "metadata", "multicast"].map((group) => ({ direction: "egress", destination: { kind: "group", group }, protocols: [], ports: [], action: "deny" })),
    rule({ kind: "group", group: "public" }, ["tcp"], [80, 443]),
  ],
};

const name = "g5-warm";
const sb = await Sandbox.builder(name).image(policy.guest_image).registry((r) => r.insecure())
  .cpus(2).memory(3072).rootDisk(16384).maxDuration(3300)
  .volume("/in", (m) => m.bind(dirname(checkoutTgz)).readonly()).volume("/out", (m) => m.bind(dirname(outTar))) // host dirs, no file streaming through node
  .network((n) => n.policy(egress)).create();
const sh = async (script, label) => {
  const t = Date.now();
  const out = await sb.shell(script);
  console.log(`[${label}] exit ${out.code} ${Math.round((Date.now() - t) / 1000)}s ${(out.stdout() + out.stderr()).trim().slice(-600)}`);
  if (!out.success) throw new Error(`${label} failed`);
};
try {
  await sh("guest-boot.sh", "dockerd");
  await sh(`mkdir -p /ctx && tar -xzf /in/${basename(checkoutTgz)} -C /ctx --no-same-owner && ls /ctx/checkout | head -20`, "context");
  await sh("cd /ctx/checkout && docker build -t warm-tizia:cache . 2>&1 | tail -15", "build");
  await sh("docker images --format '{{.Repository}}:{{.Tag}} {{.Size}}'; docker system df | head -6", "images");
  await sh(`pkill dockerd; sleep 5; du -sh /var/lib/docker; tar -C /var/lib/docker -cf - . | gzip -1 > /out/${basename(outTar)} && ls -l /out/${basename(outTar)}`, "export");
  console.log("exported", outTar);
} finally {
  await sb.stop();
  await Sandbox.remove(name);
}
