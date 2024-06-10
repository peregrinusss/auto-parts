# Админ панель проекта TruckStar

TODO
- [x]Фильтры
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

### Справочники
- [x]Пользователи
	- [ ]Модалка Изменение пользователя
	- [ ]Модалка Журнал изменений
	- [ ]Модалка Просмотр филиала
	- [ ]Модалка Просмотр склада
- [x]Марки ТС
	- [x]Просмотр марки ТС
- [ ]Отзывы
	- [ ]Модалка Добавление отзыва
	- [ ]Модалка Изменение отзыва
	- [ ]Модалка Журнал изменений (уникальный)
- [ ]Каналы трафика
	- [ ]Модалка Просмотр канал трафика
	- [ ]Модалка Журнал изменений (уникальный)
- [x]Филиалы
	- [x]Модалка Просмотр филиала
- [x]Узлы
	- [x]Модалка Изменение узла
- [ ]Категории запчастей
	- [ ]Модалка Изменение категории запчасти
- [ ]Группы запчастей
	- [ ]Модалка Добавление группы запчастей
  - [ ]Модалка Изменение группы запчастей
- [ ]Особенности запчастей
	- [ ]Модалка Добавление особенности запчастей (color picker)
  - [ ]Модалка Изменение особенности запчастей
- [ ]Источники заказов
	- [ ]Модалка Добавление источника заказа
  - [ ]Модалка Изменение источника заказа
- [ ]Способы оплаты заказов
	- [ ]Модалка Добавление способа оплаты заказа
  - [ ]Модалка Изменение способа оплаты заказа

	
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