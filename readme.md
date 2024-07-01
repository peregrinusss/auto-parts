# Админ панель проекта TruckStar


TODO
- [x]Запчасти
- [x]Заказы
- [x]Машины
- [x]Разбор
	- [x]Модалка Изменение запчасти
	- [x]Модалка Выберите модель ТС
	- [x]Модалка Выбор группы запчастей
	- [x]Модалка Журнал изменений
	- [x]Модалка Печать
  - [x]Модалка Выбор узела
  - [x]Модалка Выбор машины в разборе
  - [x]Модалка Выбор бренда
  - [x]Модалка Запросить у поставщиков

### Склад
- [x]Размещение
- [x]Инвентаризация
- [x]Склады
  - [x]Модалка Просмотр склада
- [x]Складские места: <Складское место>
  - []Модалка Добавление складского места (одно/несколько)
  - [x]Модалка Изменение складского места
  - [x]Модалка Журнал изменений

### Интеграции
- [x]Интеграции
	- [x]Модалка Просмотр интеграции с
- [x]Загрузка прайс-листов
  - [x]Модалка Просмотр поставщика
<!-- - [ ]Яндекс директ
  - [ ]Клиенты
  - [ ]Группы компаний
  - [ ]Визитки
  - [ ]Быстрые ссылки
  - [ ]Уточнения -->
- [x]Авито/Юла
  - [x]Группы
  - [x]Сборки

### Справочники
- [x]Пользователи
	- [x]Модалка Добавление пользователя
	- [x]Модалка Изменение пользователя
	- [x]Модалка Журнал изменений
	- [x]Модалка Просмотр филиала
	- [x]Модалка Просмотр склада
- [x]Марки ТС
	- [x]Просмотр марки ТС
- [x]Отзывы
	- [x]Модалка Добавление отзыва
	- [x]Модалка Изменение отзыва
	- [x]Модалка Журнал изменений (уникальный)
- [x]Каналы трафика
	- [x]Модалка Просмотр канал трафика
	- [x]Модалка Журнал изменений (уникальный)
- [x]Филиалы
	- [x]Модалка Просмотр филиала
- [x]Узлы
	- [x]Модалка Изменение узла
- [x]Категории запчастей
	- [x]Модалка Изменение категории запчасти
- [x]Группы запчастей
	- [x]Модалка Добавление группы запчастей
  - [x]Модалка Изменение группы запчастей
- [x]Особенности запчастей
	- [x]Модалка Добавление особенности запчастей (color picker)
  - [x]Модалка Изменение особенности запчастей
- [x]Источники заказов
	- [x]Модалка Добавление источника заказа
  - [x]Модалка Изменение источника заказа
- [x]Способы оплаты заказов
	- [x]Модалка Добавление способа оплаты заказа
  - [x]Модалка Изменение способа оплаты заказа

	
## Quick Start

You can get started by clicking on `Use this template` for creating new repo using this template or simply by cloning it.

Install dev dependencies

```sh
yarn install // or npm install
```

Start development server with live preview

```sh
yarn dev // or npm run dev
```

Generate build files for production server

```sh
yarn prod // or npm run prod
```

All dev files are present in `src` folder. The build version can be found in `build` folder after running `yarn build` command.

## Configuration

All configurations are found in `config.js` file in the root directory. You can configure browser default port, enable/disable plugins by simply updating boolean values (Default is set to `true`) and many more.

```js
const config = {
  tailwindjs: "./tailwind.config.js",
  port: 9050, // default port
  // purgecss options
  purgecss: {
    content: ["src/**/*.{html,js,php}"],
    ...
  },
  // imagemin options for image optimizations
  imagemin: {
    png: [0.7, 0.7], // range between min (0) and max (1) as quality - 70% with current values for png images,
    jpeg: 70, // % of compression for jpg, jpeg images
  },
};

// tailwind plugins
const plugins = {
  typography: true, // set to false to disable
  forms: true,
  containerQueries: true,
};

```