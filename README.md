# VizionBoard

🚀 **VizionBoard**, NestJS ve React kullanılarak geliştirilen, modüler ve ölçeklenebilir bir SaaS Dashboard platformudur. Monorepo mimarisi ile geliştirilen proje, `pnpm` ve `turborepo` kullanılarak yönetilir.

## 📦 Monorepo Yapısı

```
vizionboard/
├── apps/
│ ├── backend/ # NestJS tabanlı API
│ └── frontend/ # React + Tailwind UI
├── packages/
│ └── validation/ # Zod ile doğrulama şemaları (ortak kullanım)
├── turbo.json # Turbo yapılandırması
├── pnpm-workspace.yaml 
```


---

## ⚙️ Teknolojiler

### 🖥️ Frontend
- React 19
- React Router v7
- Tailwind CSS v4
- Vite
- Zod (validation paketi olarak workspace içinden kullanılıyor)

### 🔧 Backend
- NestJS 11
- Prisma ORM
- PostgreSQL
- JWT Auth (passport-jwt ile)
- BcryptJS ile şifre hashleme

### 📦 Monorepo Tools
- **pnpm workspaces** – bağımlılık yönetimi
- **turborepo** – paralel geliştirme ve cache mekanizması

---

## 🚀 Başlangıç

> Geliştirme ortamını ayağa kaldırmak için:

```bash
# 1. Reponun klonlanması
git clone https://github.com/semihalperKeskin/saas-dashboard.git
cd saas-dashboard

# 2. Bağımlılıkların kurulması
pnpm install

# 3. Prisma migrate yapılması
pnpm --filter backend prisma:migrate

# 4. Docker ayağa kaldırılması
docker-compose up -d

# 5. Turbo ile paralel başlatma
pnpm dev
