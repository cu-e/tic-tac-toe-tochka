# Крестики - нолики
Тестовое задание на стажировку frontend-разработчика

Демо: [tic-tac-toe-tochka.toropov.dev](https://tic-tac-toe-tochka.toropov.dev/)
---

### Описание
Крестики-нолики - это игра для двух игроков, которые по очереди ставят свои знаки (обычно "X" и "O") на квадратной сетке размером 3x3. Игрок, который первым выстраивает три своих знака в ряд (по горизонтали, вертикали или диагонали), выигрывает игру. Если все клетки заполнены, и ни один игрок не выиграл, игра заканчивается вничью.

---

 ## Структура проекта
```
tic-tac-toe-tochka/
├── public                                  # Статические файлы
└── src                     
    ├── main.tsx            
    ├── App.tsx             
    ├── index.css                           # Глобальные стили (Не используются компонентые стили)
    │
    ├── components          
    │   ├── GameBoard.tsx                   # Игровое поле
    │   ├── InfoPanel.tsx                   # Панель информации (счёт, время и т.п.)
    │   ├── Menu.tsx                        # Главное меню
    │   └── Result.tsx                      # Итоговый экран (победа/поражение)
    │
    ├── hooks                       
    │   ├── useGame.ts                      # Логика игры (движение, обновление состояния)
    │   ├── useGameStats.ts                 # Сбор и анализ статистики игры
    │   └── useLocalStorage.ts              # Хранение данных в localStorage
    │
    └── assets                              # Ассеты
        ├── fonts             
        ├── images
        │   ├── background.webp             # Задний фон игры
        │   └── gameplay_background.webp    # Фон игрового пространства
        ├── sounds                          # Музыка
        └── animations                      # Анимации Lottie             

```

---

## Запуск
(Чуть ниже запуск с docker)

1. Клонировать репозиторий:
   ```bash
   git clone git@github.com:cu-e/tic-tac-toe-tochka.git
   cd tic-tac-toe-tochka
   ```
2. Установить зависимости:
   ```bash
   npm install
   ```
3. Запустить приложение в режиме разработки:
   ```bash
   npm run dev
   ```
   Оно будет доступно по адресу `http://localhost:3000`.
4. Собрать продакшн-версию:
   ```bash
   npm run build
   ```

(необходимо настроить обратный прокси или откатиться на этот [коммит](https://github.com/cu-e/tic-tac-toe-tochka/commit/1d4cc20db4b6825d2019c3e2ee2c653c7598d6e1)
)
1. Запуск с Docker: 
   ```bash
   docker-compose up --build
   ```


---

## Contributing

1. Форкните репозиторий
2. Создайте ветку для своей фичи: `git checkout -b feature/<название>`
3. Внесите изменения и закоммитьте: `git commit -m "feat (или) Добавил: то то добавил"`
4. Запушьте: `git push origin feature/<название>`
5. Откройте Pull Request
