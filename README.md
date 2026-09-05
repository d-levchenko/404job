# JobScape

JobScape — вебплатформа для пошуку роботи та найму працівників. Кандидати можуть
знаходити вакансії за пошуком і фільтрами, подавати заявки та зберігати цікаві
пропозиції. Роботодавці можуть створювати й закривати вакансії, переглядати
відгуки кандидатів і змінювати статуси заявок. Проєкт організований як
монорепозиторій із окремими frontend- і backend-застосунками.

## Зміст

- [Технології](#технології)
- [Основні можливості](#основні-можливості)
- [Структура проєкту](#структура-проєкту)
- [Вимоги](#вимоги)
- [Налаштування змінних середовища](#налаштування-змінних-середовища)
- [Локальний запуск](#локальний-запуск)
- [Запуск у Docker](#запуск-у-docker)
- [Віддалений запуск і деплой](#віддалений-запуск-і-деплой)
- [API](#api)
- [Перевірка коду](#перевірка-коду)

## Технології

### Frontend

- Next.js 16 (App Router) і React 19
- TypeScript
- TanStack React Query для отримання та кешування даних
- Zustand для локального стану застосунку
- Axios для HTTP-запитів
- Formik і Yup для форм та валідації
- Tailwind CSS 4, CSS Modules і `modern-normalize`
- `react-hot-toast` для повідомлень користувачу

### Backend

- Node.js 22 і Express 5
- MongoDB та Mongoose
- REST API
- `celebrate` для валідації запитів
- Cookie-based сесії та middleware автентифікації
- Multer для завантаження файлів
- Cloudinary для зберігання зображень
- CORS, Pino HTTP logger і централізована обробка помилок

### Інфраструктура

- npm workspaces
- Docker і Docker Compose
- Prettier та ESLint

## Основні можливості

### Для кандидатів

- реєстрація та вхід до облікового запису;
- перегляд списку вакансій і сторінки окремої вакансії;
- пошук та фільтрація за текстом, типом зайнятості, досвідом, індустрією,
  локацією й віддаленим форматом;
- перегляд популярних вакансій;
- подання заявки на вакансію;
- додавання вакансій до обраного та перегляд збережених вакансій;
- редагування профілю кандидата.

### Для роботодавців

- профіль компанії та завантаження логотипа;
- створення вакансій;
- перегляд власних вакансій;
- закриття та повторне відкриття вакансій;
- перегляд заявок кандидатів;
- зміна статусу заявки: на розгляді, прийнята або відхилена.

## Структура проєкту

```text
.
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── constants/       # Типи зайнятості, досвіду, індустрії та статуси
│   │   │   ├── controllers/     # Обробники HTTP-запитів
│   │   │   ├── db/              # Підключення до MongoDB
│   │   │   ├── middleware/      # Auth, логування, помилки, upload
│   │   │   ├── models/          # Mongoose-моделі
│   │   │   ├── routes/          # Маршрути REST API
│   │   │   ├── services/        # Сервісна логіка
│   │   │   ├── utils/           # Допоміжні функції
│   │   │   └── validations/     # Схеми валідації запитів
│   │   └── .env.example
│   └── frontend/
│       ├── app/                 # Next.js сторінки та server API routes
│       ├── components/          # UI та функціональні компоненти
│       ├── hooks/               # React hooks
│       ├── lib/                 # Клієнти API та запити
│       ├── providers/           # Auth і TanStack Query providers
│       ├── store/               # Zustand stores
│       ├── types/               # TypeScript-типи
│       └── validation/          # Клієнтська валідація
├── docker/
│   ├── backend.Dockerfile
│   └── frontend.Dockerfile
├── docker-compose.yml
└── package.json
```

## Вимоги

- Node.js 22 або новіший;
- npm 10 або новіший;
- MongoDB (локальний сервер або MongoDB Atlas);
- обліковий запис Cloudinary для завантаження логотипів компаній;
- Docker Desktop — якщо запуск відбувається через Docker.

## Налаштування змінних середовища

Створіть файл `apps/backend/.env` на основі `apps/backend/.env.example`:

```env
PORT=4000
NODE_ENV=development
MONGO_URL=mongodb://127.0.0.1:27017/jobscape
CLIENT_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

`MONGO_URL` має вказувати на доступну базу даних MongoDB. Значення Cloudinary
потрібні для роботи із зображеннями профілю компанії. Не додавайте `.env` до
репозиторію та не публікуйте секрети.

## Локальний запуск

1. Клонуйте репозиторій і перейдіть до його кореня:

   ```bash
   git clone https://github.com/d-levchenko/404job.git
   cd 404job
   ```

2. Встановіть залежності для всіх workspace-пакетів:

   ```bash
   npm install
   ```

3. Створіть `apps/backend/.env` і заповніть його значеннями, описаними вище.

4. Запустіть backend та frontend у двох терміналах:

   ```bash
   npm run dev:backend
   npm run dev:frontend
   ```

   Або запускайте їх окремо з відповідних каталогів:

   ```bash
   npm run dev --workspace=backend
   npm run dev --workspace=frontend
   ```

Після запуску:

- frontend: <http://localhost:3000>;
- backend API: <http://localhost:4000/api>.

## Запуск у Docker

Для запуску production-збірок frontend і backend виконайте з кореня проєкту:

```bash
docker compose up --build
```

Перед запуском переконайтеся, що файл `apps/backend/.env` існує та містить
коректні значення. Контейнери будуть доступні на тих самих портах:

- frontend: `3000`;
- backend: `4000`.

Зупинити контейнери можна командою:

```bash
docker compose down
```

## Віддалений запуск і деплой

Проєкт можна запустити на VPS або іншому сервері з Docker:

1. Встановіть Docker Engine та Docker Compose Plugin.
2. Клонуйте репозиторій на сервер і перейдіть у його корінь.
3. Створіть `apps/backend/.env` із production-значеннями:

   ```env
   NODE_ENV=production
   PORT=4000
   MONGO_URL=<production-mongodb-url>
   CLIENT_URL=https://<frontend-domain>
   CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<cloudinary-api-key>
   CLOUDINARY_API_SECRET=<cloudinary-api-secret>
   ```

4. Вкажіть URL backend API під час збирання frontend:

   ```bash
   NEXT_PUBLIC_API_URL=https://<backend-domain> docker compose up --build -d
   ```

   У PowerShell використовуйте:

   ```powershell
   $env:NEXT_PUBLIC_API_URL="https://<backend-domain>"
   docker compose up --build -d
   ```

5. Налаштуйте DNS і reverse proxy (наприклад, Nginx) для доменів frontend та
   backend, а також HTTPS-сертифікати. MongoDB можна використовувати як
   керований сервіс, наприклад MongoDB Atlas.

> `NEXT_PUBLIC_API_URL` вбудовується у frontend під час Docker build. Після
> зміни цього значення frontend потрібно перебудувати.

## API

Усі backend-маршрути мають префікс `/api`:

| Група     | Базовий шлях     | Призначення                                         |
| --------- | ---------------- | --------------------------------------------------- |
| Auth      | `/api/auth`      | Реєстрація, вхід, оновлення та завершення сесії     |
| Users     | `/api/users`     | Поточний користувач і профілі кандидата/роботодавця |
| Vacancies | `/api/vacancies` | Пошук, перегляд, створення та керування вакансіями  |
| Options   | `/api/options`   | Дані для фільтрів і select-полів                    |

Захищені маршрути потребують активної сесії та cookie. Приклад перевірки
доступності API:

```bash
curl http://localhost:4000/api/vacancies
```

## Перевірка коду

Перевірка frontend:

```bash
npm run lint:frontend
```

Перевірка backend:

```bash
npm run lint:backend
```

Форматування всіх файлів:

```bash
npm run format
```

Збірка production-версії frontend:

```bash
npm run build --workspace=frontend
```

## Важливі примітки

- Backend очікує доступ до MongoDB під час старту й не запуститься коректно без
  `MONGO_URL`.
- Для cross-origin запитів `CLIENT_URL` має точно відповідати адресі frontend.
- У production використовуйте HTTPS і сильні, унікальні секрети для зовнішніх
  сервісів.
- Локальний Docker Compose не запускає окремий контейнер MongoDB: база даних має
  бути зовнішньою або запущеною окремо.
