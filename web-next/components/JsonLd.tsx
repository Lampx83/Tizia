// Nhúng JSON-LD (schema.org) vào trang. Server Component nên chạy trong HTML gốc
// → Googlebot đọc được ngay, không cần chờ JS.
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify an toàn; chặn thêm "</script>" phòng chuỗi dữ liệu độc hại.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
