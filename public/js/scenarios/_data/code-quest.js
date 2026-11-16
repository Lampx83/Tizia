// DATA seed — 10 level puzzle của game Code Quest (kéo-thả khối lệnh).
// Chỉ seed-content.mjs import → content_datasets(collection='code-quest-levels').
// FE (web-next/app/code-quest) đọc runtime qua GET /api/content/code-quest-levels.
// Mỗi phần tử = 1 item = 1 row. Giữ NGUYÊN VĂN dữ liệu gốc.
//
// grid 8x8, ký tự: . = trống, # = tường, G = đích, S = sao, R/U/L/D = robot & hướng.
export const CODE_QUEST_LEVELS = [
  {
    id: 1,
    name: 'Đi 3 ô tới đích',
    grid: ['........', '........', '........', 'R..G....', '........', '........', '........', '........'],
    desc: 'Robot đang nhìn sang phải. Hãy đi tới ô có cờ 🚩.',
    hint: ['move', 'move', 'move'],
  },
  {
    id: 2,
    name: 'Đi và quay phải',
    grid: ['........', '........', '........', 'R...,...', '....,...', '....G...', '........', '........'],
    desc: 'Đi sang phải rồi quay xuống đến đích.',
    hint: ['move', 'move', 'move', 'move', 'turn_right', 'move', 'move'],
  },
  {
    id: 3,
    name: 'Lặp đi 4 lần',
    grid: ['........', '........', '........', 'R......G', '........', '........', '........', '........'],
    desc: 'Thay vì gõ move 7 lần, hãy dùng khối "Lặp N lần".',
    hint: ['repeat:7', 'move'],
  },
  {
    id: 4,
    name: 'Nhặt 3 ⭐ rồi tới đích',
    grid: ['........', '........', '........', 'RS.S.S.G', '........', '........', '........', '........'],
    desc: 'Đi và nhặt 3 ngôi sao ⭐ trên đường tới đích.',
    hint: ['repeat:7', 'if_gold', 'pick', 'move'],
  },
  {
    id: 5,
    name: 'Né tường',
    grid: ['........', '........', 'R.#.....', '..#.....', '..#.....', '..#.G...', '........', '........'],
    desc: 'Có tường 🟫 chặn đường. Hãy đi vòng qua.',
    hint: ['move', 'turn_right', 'move', 'move', 'move', 'turn_left', 'move', 'move', 'move'],
  },
  {
    id: 6,
    name: 'Mê cung if-else',
    grid: ['........', '.######.', '.R...S#.', '.####.#.', '....#.#.', '###.#.#.', 'G...#.#.', '....#.#.'],
    desc: 'Dùng "Nếu trước mặt trống" để đi tự động.',
    hint: ['repeat:12', 'if_clear', 'move', 'if_gold', 'pick', 'turn_right'],
  },
  {
    id: 7,
    name: 'Vòng quanh hình vuông',
    grid: ['........', '.RSSSS..', '.S...S..', '.S...S..', '.S...S..', '.SSSSG..', '........', '........'],
    desc: 'Đi vòng theo cạnh hình vuông, nhặt sạch ⭐.',
    hint: ['repeat:4', 'repeat:4', 'if_gold', 'pick', 'move', 'turn_right'],
  },
  {
    id: 8,
    name: 'Mê cung tự động',
    grid: ['R.######', '.#.....#', '.#.###.#', '.#.#.#.#', '.#.#S#.#', '.#.#.#.#', '.#...#.#', '.####.G#'],
    desc: 'Đi theo lối hẹp, dùng if/loop để tự động hoá.',
    hint: ['repeat:20', 'if_clear', 'move', 'if_gold', 'pick'],
  },
  {
    id: 9,
    name: 'Thu thập kho báu',
    grid: ['R.S.S.S.', '........', 'S.S.S.S.', '........', 'S.S.S.S.', '........', 'S.S.S.G.', '........'],
    desc: 'Có rất nhiều ⭐ trên bàn cờ. Nhặt càng nhiều càng tốt rồi tới đích.',
    hint: ['repeat:20', 'if_gold', 'pick', 'move'],
  },
  {
    id: 10,
    name: 'Robot thông minh',
    grid: ['###.....', 'R...S...', '###.#...', '....#...', '.####...', '.S......', '.#####..', '.....G..'],
    desc: 'Đường đi phức tạp. Hãy kết hợp lặp + if để giải.',
    hint: ['repeat:30', 'if_clear', 'move', 'if_gold', 'pick', 'turn_right'],
  },
];
