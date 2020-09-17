BEGIN;

TRUNCATE
  items,
  users,
  cart
  RESTART IDENTITY CASCADE;

INSERT INTO items (id, name, price, description, grade, universe, itemImage, numberofitems)
VALUES
  (1, 'wing zero', 55, ' appears in the OVA/movie Mobile Suit Gundam Wing: Endless Waltz. It is redesigned by seriess mecha designer Hajime Katoki','mastergrade', 'After Colony', 'https://cdn.shopify.com/s/files/1/0727/8355/products/12_4597440c-5a47-467d-adf4-736e3f5430d4_800x.JPG?v=1570039177',4),
  (2, 'nu gundam', 78,  'The RX-93 ν Gundam (aka Nu Gundam, Nu) is a mobile suit that appears in Mobile Suit Gundam: Chars Counterattack. It was designed and piloted by Amuro Ray', 'mastergrade', 'universal century','https://images-na.ssl-images-amazon.com/images/I/71QQtucK8OL._AC_SY679_.jpg',8),
  (3, 'barbatos', 50, 'The ASW-G-08 Gundam Barbatos is the main mobile suit of the Mobile Suit Gundam IRON-BLOODED ORPHANS television series. The unit is primarily piloted by Mikazuki Augus.','mastergrade', 'Post Disaster Era','https://images-na.ssl-images-amazon.com/images/I/611lHD6dHwL._AC_SX466_.jpg',2),
  (4, 'dynames', 45,  'The GN-002 Gundam Dynames (aka Gundam Dynames, Dynames) is a mobile suit featured in in season one of Mobile Suit Gundam 00and is piloted by Lockon Stratos','mastergrade', 'Anno Domini ','https://cdn.shopify.com/s/files/1/2786/5582/products/153_3080_s_9247rzkn0ibl30cgdqw0xn5zsrdy_1024x1024.jpg?v=1571720410',4);

INSERT INTO users (id,email, name, password)
VALUES
  (1, 'marlo@gmail.com', 'marlo', '$2a$12$uWLe1509jWy1d9bxUU1dWOGpU5Ed51cKZo03Z7XjnVe43p4hwgt6W'),
  (2, 'newUser@gmail.com', 'Noob', '$2a$12$G/BXrq8PEFm.LKm7uLhOl.iO09viiaCy374.2LVqJglIlT..cD6l6');


INSERT INTO cart (userid, itemid,itemcount)
VALUES
  (1, 2, 1),
  (2, 3, 1),
  (1, 4, 1);


COMMIT;
