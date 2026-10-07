/** The destination is trusted and fixed: never turn a candidate path into a runner/host URL. */
export const PREVIEW_PORT = 8041;
export const PREVIEW_BODY_LIMIT = 1024 * 1024;
export const PREVIEW_HTTP_SCRIPT = `
import base64, http.client, ipaddress, json, subprocess, sys
request = json.loads(sys.argv[1])
# Docker internal networks do not publish their ports. Resolve only our fixed
# trusted Compose container/network inside this VM; caller input never chooses a host.
address = subprocess.check_output(["docker", "inspect", "-f",
    '{{with index .NetworkSettings.Networks "private-preview-net"}}{{.IPAddress}}{{end}}',
    "private-preview-tizia-1"], text=True, timeout=5).strip()
ip = ipaddress.ip_address(address)
network = json.loads(subprocess.check_output(["docker", "network", "inspect",
    "private-preview-net"], text=True, timeout=5))[0]
subnets = [ipaddress.ip_network(item["Subnet"]) for item in network["IPAM"]["Config"]]
service = subprocess.check_output(["docker", "inspect", "-f",
    '{{index .Config.Labels "com.docker.compose.service"}}', "private-preview-tizia-1"],
    text=True, timeout=5).strip()
if (service != "tizia" or network.get("Internal") is not True or ip.version != 4
        or not ip.is_private or ip.is_loopback or ip.is_link_local
        or not any(ip in subnet for subnet in subnets if subnet.version == 4)):
    raise ValueError("invalid private preview address")
connection = http.client.HTTPConnection(str(ip), ${PREVIEW_PORT}, timeout=10)
try:
    connection.request(request["method"], request["path"],
        body=base64.b64decode(request.get("body", ""), validate=True), headers=request["headers"])
    response = connection.getresponse()
    body = response.read(${PREVIEW_BODY_LIMIT} + 1)
    if len(body) > ${PREVIEW_BODY_LIMIT}:
        raise ValueError("response too large")
    allowed = {"content-type", "location", "set-cookie"}
    headers = [[name.lower(), value] for name, value in response.getheaders() if name.lower() in allowed]
    print(json.dumps({"status": response.status, "headers": headers, "body": base64.b64encode(body).decode("ascii")}))
finally:
    connection.close()
`;

export function validPreviewRequest(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)
      || Object.entries(value).some(([name]) => !['method', 'path', 'headers', 'body'].includes(name))) return false;
  if (!['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(value.method)) return false;
  if (typeof value.path !== 'string' || value.path.length > 4096 || !value.path.startsWith('/')
      || value.path.startsWith('//') || /[\\\x00-\x20\x7f#]/.test(value.path)) return false;
  const headers = value.headers ?? {};
  if (!headers || typeof headers !== 'object' || Array.isArray(headers)
      || Object.entries(headers).some(([name, content]) => !['content-type', 'accept', 'cookie', 'x-csrf-token'].includes(name)
        || typeof content !== 'string' || content.length > 8192 || /[\r\n\x00]/.test(content))) return false;
  if (value.body !== undefined && (typeof value.body !== 'string' || value.body.length > 48 * 1024
      || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value.body))) return false;
  return true;
}
