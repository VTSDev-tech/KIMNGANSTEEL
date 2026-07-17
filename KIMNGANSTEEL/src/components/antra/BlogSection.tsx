import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    title: "Cách Chọn Độ Dày Tôn Lợp Phù Hợp Cho Nhà Xưởng Công Nghiệp",
    category: "Kiến Thức",
    date: "12 Tháng 7, 2026",
    image: "/nha_xuong.png",
  },
  {
    title: "Kinh Nghiệm Thi Công Mái Tôn Chống Dột Hiệu Quả Mùa Mưa",
    category: "Thi Công",
    date: "05 Tháng 7, 2026",
    image: "/nha_thep_tien_che.png",
  },
  {
    title: "Phân Biệt Tôn Lạnh Và Tôn Mạ Kẽm: Loại Nào Tốt Hơn?",
    category: "Kiến Thức",
    date: "28 Tháng 6, 2026",
    image: "/cong_trinh_dan_dung.png",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="antra-section antra-blog">
      <div className="antra-section-heading compact">
        <p className="antra-kicker dark">Thông tin & Góc nhìn chuyên gia</p>
        <h2>Chia sẻ <span>Kinh nghiệm</span> & Tư vấn Vật tư.</h2>
      </div>
      <div className="antra-blog-grid">
        {posts.map((post) => (
          <article key={post.title}>
            <div className="antra-blog-image" style={{ backgroundImage: `url(${post.image})` }}>
              <span>{post.category}</span>
            </div>
            <small>{post.date} · Ban Biên Tập</small>
            <h3>{post.title}</h3>
            <a href="/kinh-nghiem">Xem chi tiết <ArrowUpRight size={15} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

