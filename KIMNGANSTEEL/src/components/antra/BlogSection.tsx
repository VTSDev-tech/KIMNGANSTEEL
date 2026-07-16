import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    title: "Bảng Báo Giá Tôn Thép Mới Nhất Năm 2026 - Cập Nhật Liên Tục",
    category: "Báo Giá",
    date: "16 Tháng 7, 2026",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Kinh Nghiệm Chọn Xà Gồ Thép Trọng Lượng Nhẹ Cho Mái Nhà Xưởng",
    category: "Kinh Nghiệm",
    date: "12 Tháng 7, 2026",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Kim Ngân Steel Chính Thức Khai Trương Nhà Máy Cán Tôn Mới Tại Miền Nam",
    category: "Sự Kiện",
    date: "05 Tháng 7, 2026",
    image: "https://images.unsplash.com/photo-1541888081-30eb3bc17e75?auto=format&fit=crop&w=900&q=85",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="antra-section antra-blog">
      <div className="antra-section-heading compact">
        <p className="antra-kicker dark">Thông tin & Góc nhìn chuyên gia</p>
        <h2>Cập nhật tin tức <span>Thị trường Thép</span> mới nhất.</h2>
      </div>
      <div className="antra-blog-grid">
        {posts.map((post) => (
          <article key={post.title}>
            <div className="antra-blog-image" style={{ backgroundImage: `url(${post.image})` }}>
              <span>{post.category}</span>
            </div>
            <small>{post.date} · Ban Biên Tập</small>
            <h3>{post.title}</h3>
            <a href="#contact">Xem chi tiết <ArrowUpRight size={15} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

