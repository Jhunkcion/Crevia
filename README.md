# CRIVEA Website

Website company profile untuk **CRIVEA**, perusahaan yang bergerak di bidang **Creative** dan **Technology**.

Website ini dibuat untuk memperkenalkan CRIVEA, menampilkan talent yang tergabung di dalamnya, serta menampilkan project yang telah dikerjakan.

## Preview

> Screenshot / preview website akan ditambahkan setelah versi awal selesai.

---

## About CRIVEA

CRIVEA memiliki dua divisi utama:

- **Creative**
- **Tech**

Salah satu fokus utama website ini adalah memperkenalkan orang-orang di balik CRIVEA. Setiap talent memiliki halaman profile yang berisi informasi mengenai role, keahlian, dan project yang pernah dikerjakan.

---

## Pages

### Home
Halaman utama yang berisi:

- Hero
- About CRIVEA
- Division
- Featured Talent
- Featured Work
- Testimonials
- Contact

### Talent
Menampilkan seluruh talent CRIVEA berdasarkan divisi:

- All
- Creative
- Tech

### Talent Detail
Setiap talent memiliki halaman profile sendiri yang menampilkan:

- Foto
- Nama
- Role
- Division
- Bio
- Skills
- Selected Projects
- Social Media

### Work
Menampilkan project yang telah dikerjakan oleh CRIVEA.

### Contact
Berisi informasi dan social media CRIVEA.

---

## Admin

Admin panel disiapkan untuk mengelola data website seperti:

- Talent
- Projects
- Testimonials

Untuk tahap awal, admin masih berupa **frontend prototype** menggunakan data lokal.

Backend dan database akan ditambahkan pada tahap pengembangan berikutnya.

---

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- React Router

Tools:

- Git
- GitHub
- VS Code

---

## Project Structure

```text
src/
├── assets/
├── components/
├── data/
├── pages/
├── App.jsx
├── main.jsx
└── index.css
```

Data website untuk sementara disimpan di:

```text
src/data/
├── talents.js
├── projects.js
└── testimonials.js
```

Struktur ini dibuat agar nantinya data dapat dengan mudah dihubungkan ke API ketika backend sudah dibuat.

---

## Design

Website menggunakan konsep **modern creative agency** dengan fokus pada:

- Dark blue & blue
- Typography yang besar
- Visual yang kuat
- Clean layout
- Responsive design
- Smooth animation
- Subtle parallax
- Interactive hover effect

Desain dibuat agar terasa seperti website creative/digital agency dan bukan template company profile biasa.

---

## Installation

Clone repository:

```bash
git clone <repository-url>
```

Masuk ke folder project:

```bash
cd CRIVEA
```

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Kemudian buka alamat yang diberikan oleh Vite pada browser.

---

## Development

Project ini dikerjakan oleh tim yang terdiri dari 4 orang.

Branch utama:

```text
main
develop
```

Untuk membuat feature baru:

```bash
git checkout develop
git pull
git checkout -b feature/nama-feature
```

Setelah selesai, lakukan commit dan push:

```bash
git add .
git commit -m "feat: add talent section"
git push origin feature/nama-feature
```

Feature kemudian akan melalui proses review sebelum digabungkan ke `develop`.

---

## Roadmap

### Frontend
- [x] Project setup
- [ ] Home
- [ ] Talent
- [ ] Talent Detail
- [ ] Work
- [ ] Contact
- [ ] Admin UI
- [ ] Responsive optimization
- [ ] Animation & interaction

### Backend
- [ ] API
- [ ] Database
- [ ] Authentication
- [ ] Admin CRUD
- [ ] Image upload

---

## Status

**Currently in development.**

Frontend menjadi fokus utama pada tahap awal. Backend dan database akan dikembangkan setelah struktur frontend selesai.

---

## License

This project is developed for **CRIVEA**.
