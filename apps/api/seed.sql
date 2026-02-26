-- Clean up existing data (Safe deletion order)
DELETE FROM trackings;
DELETE FROM likes;
DELETE FROM feedbacks;
DELETE FROM annonces;
DELETE FROM devices;
DELETE FROM users;
DELETE FROM roles;

-- 1. Roles
-- ID: 3b46182c-b510-4446-91e8-d8904797171d
INSERT INTO roles (id, name) VALUES 
('3b46182c-b510-4446-91e8-d8904797171d', 'ADMIN');

-- 2. Users (Password: password123)
-- Admin User
INSERT INTO users (id, firstname, lastname, username, email, password, email_verified, notif_enabled, score, average_response_time, role_id, created_at, updated_at) VALUES 
('de70585d-fd07-460e-a6af-2bc481f23b25', 'Admin', 'Super', 'admin', 'admin@flemme.com', '$2b$10$Ki4YfzIMD.TeJemO0O0HFewOjz2fMCqOBmBP0RnQd6jvlX2PM8smm', 1, 1, 100, 0, '3b46182c-b510-4446-91e8-d8904797171d', NOW(), NOW());

-- Regular User 1 (Alice)
INSERT INTO users (id, firstname, lastname, username, email, password, email_verified, notif_enabled, score, average_response_time, role_id, created_at, updated_at) VALUES 
('2c39e4bd-11d6-45e2-bf99-7239623e4cf7', 'Alice', 'Doe', 'aliced', 'alice@example.com', '$2b$10$Ki4YfzIMD.TeJemO0O0HFewOjz2fMCqOBmBP0RnQd6jvlX2PM8smm', 1, 1, 4.8, 120, NULL, NOW(), NOW());

-- Regular User 2 (Bob)
INSERT INTO users (id, firstname, lastname, username, email, password, email_verified, notif_enabled, score, average_response_time, role_id, created_at, updated_at) VALUES 
('338715f7-2186-4760-93e2-93ee0cb70eac', 'Bob', 'Smith', 'bobbuilder', 'bob@example.com', '$2b$10$Ki4YfzIMD.TeJemO0O0HFewOjz2fMCqOBmBP0RnQd6jvlX2PM8smm', 1, 1, 3.5, 300, NULL, NOW(), NOW());

-- Regular User 3 (Charlie)
INSERT INTO users (id, firstname, lastname, username, email, password, email_verified, notif_enabled, score, average_response_time, role_id, created_at, updated_at) VALUES 
('d1a76ab7-bcbd-4cbd-9981-e745577ffac6', 'Charlie', 'Brown', 'charlieb', 'charlie@example.com', '$2b$10$Ki4YfzIMD.TeJemO0O0HFewOjz2fMCqOBmBP0RnQd6jvlX2PM8smm', 1, 1, 4.2, 60, NULL, NOW(), NOW());

-- Regular User 4 (David)
INSERT INTO users (id, firstname, lastname, username, email, password, email_verified, notif_enabled, score, average_response_time, role_id, created_at, updated_at) VALUES 
('1634000c-d46a-4703-b124-167b085c1efc', 'David', 'Miller', 'davem', 'david@example.com', '$2b$10$Ki4YfzIMD.TeJemO0O0HFewOjz2fMCqOBmBP0RnQd6jvlX2PM8smm', 1, 1, 4.9, 45, NULL, NOW(), NOW());

-- Regular User 5 (Eve)
INSERT INTO users (id, firstname, lastname, username, email, password, email_verified, notif_enabled, score, average_response_time, role_id, created_at, updated_at) VALUES 
('189ef79e-da1a-4cdf-bb9c-b3549764c93c', 'Eve', 'Taylor', 'eve_style', 'eve@example.com', '$2b$10$Ki4YfzIMD.TeJemO0O0HFewOjz2fMCqOBmBP0RnQd6jvlX2PM8smm', 1, 1, 4.5, 180, NULL, NOW(), NOW());

-- Regular User 6 (Frank)
INSERT INTO users (id, firstname, lastname, username, email, password, email_verified, notif_enabled, score, average_response_time, role_id, created_at, updated_at) VALUES 
('69fd9b05-1b97-4b87-a3d1-a200e2c3605c', 'Frank', 'Wilson', 'frankie', 'frank@example.com', '$2b$10$Ki4YfzIMD.TeJemO0O0HFewOjz2fMCqOBmBP0RnQd6jvlX2PM8smm', 1, 0, 3.0, 600, NULL, NOW(), NOW());

-- Regular User 7 (Grace)
INSERT INTO users (id, firstname, lastname, username, email, password, email_verified, notif_enabled, score, average_response_time, role_id, created_at, updated_at) VALUES 
('b3c243cf-a9b9-4442-a22d-b53d59fbfbeb', 'Grace', 'Lee', 'grace_music', 'grace@example.com', '$2b$10$Ki4YfzIMD.TeJemO0O0HFewOjz2fMCqOBmBP0RnQd6jvlX2PM8smm', 1, 1, 5.0, 30, NULL, NOW(), NOW());


-- 3. Devices
INSERT INTO devices (id, user_id, user_agent, ip, created_at, expired_at, last_used_at) VALUES
('06479647-864f-4eb8-aaad-1cdbb5cc0aa3', 'de70585d-fd07-460e-a6af-2bc481f23b25', 'Mozilla/5.0 (Macintosh)', '192.168.1.1', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), NOW()),
('4c73605c-d121-4fd8-958d-4b386c7b7764', '2c39e4bd-11d6-45e2-bf99-7239623e4cf7', 'Mozilla/5.0 (iPhone)', '192.168.1.2', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), NOW()),
('1f5b6db5-bfe3-44b4-bd2f-7758b37febe6', '338715f7-2186-4760-93e2-93ee0cb70eac', 'Mozilla/5.0 (Windows)', '192.168.1.3', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), NOW()),
('b08245fe-873f-4400-9c6c-dfcdfef62720', 'd1a76ab7-bcbd-4cbd-9981-e745577ffac6', 'Mozilla/5.0 (Android)', '192.168.1.4', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), NOW()),
('5bc9085f-ba57-4eed-a1aa-8d7bf288177b', '1634000c-d46a-4703-b124-167b085c1efc', 'Mozilla/5.0 (Macintosh)', '192.168.1.5', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), NOW()),
('08a74810-e9aa-4600-a42e-f80590585ca0', '189ef79e-da1a-4cdf-bb9c-b3549764c93c', 'Mozilla/5.0 (iPhone)', '192.168.1.6', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), NOW()),
('393a90a9-fcfe-4cfb-9585-79ef22fd8c31', '69fd9b05-1b97-4b87-a3d1-a200e2c3605c', 'Mozilla/5.0 (Windows)', '192.168.1.7', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), NOW()),
('f916f461-6ec9-4e93-819e-0ff9f9121da0', 'b3c243cf-a9b9-4442-a22d-b53d59fbfbeb', 'Mozilla/5.0 (Macintosh)', '192.168.1.8', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), NOW());


-- 4. Annonces
-- Annonces for Alice (Furniture & Decor)
INSERT INTO annonces (id, title, description, price, latitude, longitude, user_id, created_at, updated_at) VALUES
('68469a84-17fa-41f1-80e6-52c21fbd28ce', 'Vintage Sofa', 'A beautiful vintage sofa, velvet, emerald green. Must pick up.', 150.00, 48.8566, 2.3522, '2c39e4bd-11d6-45e2-bf99-7239623e4cf7', NOW(), NOW()),
('df16b5d3-9a09-46a8-9aed-d3c5b55cae93', 'Desk Lamp', 'Adjustable desk lamp, black metal. Works perfectly.', 25.50, 48.8580, 2.3500, '2c39e4bd-11d6-45e2-bf99-7239623e4cf7', NOW(), NOW()),
('cc2d1572-7a41-44e4-ae90-fc93d58d20ac', 'Coffee Table', 'Glass coffee table, slight scratch on corner.', 40.00, 48.8570, 2.3510, '2c39e4bd-11d6-45e2-bf99-7239623e4cf7', NOW(), NOW());

-- Annonces for Bob (Sports & Tools)
INSERT INTO annonces (id, title, description, price, latitude, longitude, user_id, created_at, updated_at) VALUES
('b3ad6d4f-645e-4432-a68e-c25f5b3183d2', 'Mountain Bike', 'Used mountain bike, needs new tires suitable for trails.', 80.00, 48.8600, 2.3400, '338715f7-2186-4760-93e2-93ee0cb70eac', NOW(), NOW()),
('0ecfaea8-5fe1-426b-a6b9-f8f9d1082534', 'Tennis Racket', 'Wilson tennis racket, good grip.', 30.00, 48.8610, 2.3410, '338715f7-2186-4760-93e2-93ee0cb70eac', NOW(), NOW()),
('de137057-9025-4286-a322-01709af4c0ef', 'Toolbox', 'Complete set of tools, hammer, screwdrivers, etc.', 50.00, 48.8620, 2.3420, '338715f7-2186-4760-93e2-93ee0cb70eac', NOW(), NOW());

-- Annonces for Charlie (Electronics)
INSERT INTO annonces (id, title, description, price, latitude, longitude, user_id, created_at, updated_at) VALUES
('280126d4-adc1-4e2d-95ce-27d1a6aef4f1', 'Gaming Laptop', 'High performance laptop, GTX 3060, 16GB RAM.', 800.00, 48.8700, 2.3300, 'd1a76ab7-bcbd-4cbd-9981-e745577ffac6', NOW(), NOW()),
('03c3cc66-55fd-4a02-9acc-65855e89c2c0', 'PS5 Controller', 'DualSense controller, white, barely used.', 45.00, 48.8710, 2.3310, 'd1a76ab7-bcbd-4cbd-9981-e745577ffac6', NOW(), NOW()),
('f0187cf9-50f3-426f-b44c-dcb4de5d86d3', 'Mechanical Keyboard', 'RGB Mechanical keyboard, blue switches.', 60.00, 48.8720, 2.3320, 'd1a76ab7-bcbd-4cbd-9981-e745577ffac6', NOW(), NOW()),
('c295d7f8-d769-4e0f-9931-8ede07c835fe', '24 Inch Monitor', '1080p 144hz monitor, perfect for gaming.', 120.00, 48.8730, 2.3330, 'd1a76ab7-bcbd-4cbd-9981-e745577ffac6', NOW(), NOW());

-- Annonces for David (Photography & Art)
INSERT INTO annonces (id, title, description, price, latitude, longitude, user_id, created_at, updated_at) VALUES
('42f45118-8afa-4333-b11b-f98382535d54', 'Canon DSLR Lens', '50mm f/1.8 lens, pristine condition.', 90.00, 48.8800, 2.3200, '1634000c-d46a-4703-b124-167b085c1efc', NOW(), NOW()),
('b8d3434e-0a06-4074-a630-f47ef5c91e01', 'Tripod', 'Lightweight travel tripod.', 20.00, 48.8810, 2.3210, '1634000c-d46a-4703-b124-167b085c1efc', NOW(), NOW()),
('ce37b51b-26a3-41ce-8380-45f8f307ba91', 'Camera Bag', 'Waterproof camera backpack.', 35.00, 48.8820, 2.3220, '1634000c-d46a-4703-b124-167b085c1efc', NOW(), NOW());

-- Annonces for Eve (Fashion)
INSERT INTO annonces (id, title, description, price, latitude, longitude, user_id, created_at, updated_at) VALUES
('2ed8c156-829d-4723-afc6-d9b89e9008bc', 'Designer Handbag', 'Authentic leather handbag, vintage.', 120.00, 48.8900, 2.3100, '189ef79e-da1a-4cdf-bb9c-b3549764c93c', NOW(), NOW()),
('e2a4f48b-302a-4351-8b3a-fb5062a4d048', 'Winter Coat', 'Wool coat, size M, beige.', 80.00, 48.8910, 2.3110, '189ef79e-da1a-4cdf-bb9c-b3549764c93c', NOW(), NOW()),
('8f4d9247-49f4-4363-be97-fa16d55268c1', 'Sunglasses', 'Aviator sunglasses.', 15.00, 48.8920, 2.3120, '189ef79e-da1a-4cdf-bb9c-b3549764c93c', NOW(), NOW()),
('d8e9f563-128c-4a1e-82d1-0f7e9a865b4c', 'Scarf', 'Silk scarf, floral pattern.', 10.00, 48.8930, 2.3130, '189ef79e-da1a-4cdf-bb9c-b3549764c93c', NOW(), NOW());

-- Annonces for Frank (Books & Dorm items)
INSERT INTO annonces (id, title, description, price, latitude, longitude, user_id, created_at, updated_at) VALUES
('b3c8f9de-23c5-442a-a92c-567e8910eaf2', 'Calculus Textbook', 'Calculus Early Transcendentals, 8th Edition.', 40.00, 48.8400, 2.3600, '69fd9b05-1b97-4b87-a3d1-a200e2c3605c', NOW(), NOW()),
('a5e12f34-8c90-41ab-8e5f-17283940cdef', 'Mini Fridge', 'Compact fridge for dorm room.', 50.00, 48.8410, 2.3610, '69fd9b05-1b97-4b87-a3d1-a200e2c3605c', NOW(), NOW()),
('c7a8b9d0-12ef-3456-7890-a1b2c3d4e5f6', 'Desk Chair', 'Basic office chair, black.', 15.00, 48.8420, 2.3620, '69fd9b05-1b97-4b87-a3d1-a200e2c3605c', NOW(), NOW());

-- Annonces for Grace (Music)
INSERT INTO annonces (id, title, description, price, latitude, longitude, user_id, created_at, updated_at) VALUES
('5dcfd35b-7ad2-4196-b9e6-8b67939627dd', 'Acoustic Guitar', 'Yamaha acoustic guitar with case.', 110.00, 48.8300, 2.3700, 'b3c243cf-a9b9-4442-a22d-b53d59fbfbeb', NOW(), NOW()),
('2dd03a62-485c-4b90-bb07-69d59a265df8', 'Music Stand', 'Foldable music stand.', 10.00, 48.8310, 2.3710, 'b3c243cf-a9b9-4442-a22d-b53d59fbfbeb', NOW(), NOW()),
('65e318c6-9336-49ea-b07e-a39a63ca6391', 'Violin Bow', 'Carbon fiber violin bow.', 45.00, 48.8320, 2.3720, 'b3c243cf-a9b9-4442-a22d-b53d59fbfbeb', NOW(), NOW());


-- 5. Likes
-- Bob likes Alice's Sofa
INSERT INTO likes (id, user_id, annonce_id, created_at) VALUES
('b171536f-d850-4e0f-ae32-7e0a9c821096', '338715f7-2186-4760-93e2-93ee0cb70eac', '68469a84-17fa-41f1-80e6-52c21fbd28ce', NOW());

-- Charlie likes Bob's Bike
INSERT INTO likes (id, user_id, annonce_id, created_at) VALUES
('603bbccd-e056-45e9-81f6-f92d49c097a0', 'd1a76ab7-bcbd-4cbd-9981-e745577ffac6', 'b3ad6d4f-645e-4432-a68e-c25f5b3183d2', NOW());

-- Eve likes Grace's Guitar
INSERT INTO likes (id, user_id, annonce_id, created_at) VALUES
('8de9aeaf-b909-4042-81ec-6b6c74a113dc', '189ef79e-da1a-4cdf-bb9c-b3549764c93c', '5dcfd35b-7ad2-4196-b9e6-8b67939627dd', NOW());

-- Frank likes Charlie's Laptop (Dreaming)
INSERT INTO likes (id, user_id, annonce_id, created_at) VALUES
('113953a5-b50f-484b-a26b-9113f276fe07', '69fd9b05-1b97-4b87-a3d1-a200e2c3605c', '280126d4-adc1-4e2d-95ce-27d1a6aef4f1', NOW());


-- 6. Feedbacks
-- Bob gives feedback to Alice
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('aca9ab1d-c335-4f15-88c1-fb66eec093b2', 5, 'Excellente transaction ! Très réactive et sympathique.', '2c39e4bd-11d6-45e2-bf99-7239623e4cf7', '338715f7-2186-4760-93e2-93ee0cb70eac', NOW());

-- Alice gives feedback to Bob
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('78680f4b-1adf-4272-beb6-3ec1ba7e623d', 4, 'Bon acheteur, légèrement en retard mais correct.', '338715f7-2186-4760-93e2-93ee0cb70eac', '2c39e4bd-11d6-45e2-bf99-7239623e4cf7', NOW());

-- David gives feedback to Eve
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('23c1b145-859d-4470-9747-8e527fd5c7b5', 5, 'Super acheteuse ! Transaction impeccable.', '189ef79e-da1a-4cdf-bb9c-b3549764c93c', '1634000c-d46a-4703-b124-167b085c1efc', NOW());

-- Charlie gives feedback to Alice
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('85cbe4af-2a6c-42c5-a468-52cd499e6c8b', 5, 'Parfait ! Le canapé était exactement comme décrit.', '2c39e4bd-11d6-45e2-bf99-7239623e4cf7', 'd1a76ab7-bcbd-4cbd-9981-e745577ffac6', NOW());

-- Grace gives feedback to Charlie
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('2dee6508-6fd3-4cdd-ba4c-e39ef5f2493a', 4, 'Très bon vendeur, matériel en bon état.', 'd1a76ab7-bcbd-4cbd-9981-e745577ffac6', 'b3c243cf-a9b9-4442-a22d-b53d59fbfbeb', NOW());

-- Eve gives feedback to Grace
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('fbc04176-b270-4770-b4d5-586e53996c12', 5, 'La guitare est magnifique ! Merci beaucoup.', 'b3c243cf-a9b9-4442-a22d-b53d59fbfbeb', '189ef79e-da1a-4cdf-bb9c-b3549764c93c', NOW());

-- Frank gives feedback to David
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('627ba99a-5ce7-42e7-9f82-d07dbc2d47d9', 5, 'Objectif photo impeccable, emballage soigné.', '1634000c-d46a-4703-b124-167b085c1efc', '69fd9b05-1b97-4b87-a3d1-a200e2c3605c', NOW());

-- Alice gives feedback to Charlie
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('009ca69a-550d-4384-ba6e-ddc8249bb865', 4, 'Bonne communication, livraison rapide.', 'd1a76ab7-bcbd-4cbd-9981-e745577ffac6', '2c39e4bd-11d6-45e2-bf99-7239623e4cf7', NOW());

-- Bob gives feedback to Eve
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('26df2ee5-74fb-463f-b509-d68712a5b882', 5, 'Superbe sac à main, état neuf !', '189ef79e-da1a-4cdf-bb9c-b3549764c93c', '338715f7-2186-4760-93e2-93ee0cb70eac', NOW());

-- Charlie gives feedback to Frank
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('db1e9247-b3e1-446f-a334-059b96bccbb0', 3, 'Le livre était un peu abîmé mais ça va.', '69fd9b05-1b97-4b87-a3d1-a200e2c3605c', 'd1a76ab7-bcbd-4cbd-9981-e745577ffac6', NOW());

-- Grace gives feedback to Bob
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('e2ab19b3-1a3b-4748-8659-10abefcf3acf', 5, 'Très bon vélo, conforme à la description.', '338715f7-2186-4760-93e2-93ee0cb70eac', 'b3c243cf-a9b9-4442-a22d-b53d59fbfbeb', NOW());

-- David gives feedback to Alice
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('cfedbe7e-e524-41f4-936b-c27e6d08d516', 5, 'Lampe parfaite pour mon bureau, merci !', '2c39e4bd-11d6-45e2-bf99-7239623e4cf7', '1634000c-d46a-4703-b124-167b085c1efc', NOW());

-- Eve gives feedback to Bob
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('81508da1-ec39-40be-a416-ae922689aa75', 4, 'Bon vendeur, un peu lent à répondre.', '338715f7-2186-4760-93e2-93ee0cb70eac', '189ef79e-da1a-4cdf-bb9c-b3549764c93c', NOW());

-- Frank gives feedback to Grace
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('6242b752-e691-4e14-964f-9c46e9a6bef8', 5, 'Le pupitre est top, parfait pour mes cours.', 'b3c243cf-a9b9-4442-a22d-b53d59fbfbeb', '69fd9b05-1b97-4b87-a3d1-a200e2c3605c', NOW());

-- Alice gives feedback to David
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('79a94351-33ce-4764-bdbf-17964e1982ff', 5, 'Photos magnifiques avec cet objectif !', '1634000c-d46a-4703-b124-167b085c1efc', '2c39e4bd-11d6-45e2-bf99-7239623e4cf7', NOW());

-- Bob gives feedback to Charlie
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('7176370a-bad7-4779-9539-cdd8ad1f0850', 4, 'Le clavier fonctionne bien, quelques traces.', 'd1a76ab7-bcbd-4cbd-9981-e745577ffac6', '338715f7-2186-4760-93e2-93ee0cb70eac', NOW());

-- Charlie gives feedback to Grace
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('c5ac2767-d896-46a9-9a33-6ab5cbe4315d', 5, 'Archet de violon superbe, merci !', 'b3c243cf-a9b9-4442-a22d-b53d59fbfbeb', 'd1a76ab7-bcbd-4cbd-9981-e745577ffac6', NOW());

-- Eve gives feedback to Frank
INSERT INTO feedbacks (id, rating, message, receiver_id, sender_id, created_at) VALUES
('62524dd1-bf9e-4335-acb1-ece0f220d9e9', 4, 'Petit frigo pratique, merci !', '69fd9b05-1b97-4b87-a3d1-a200e2c3605c', '189ef79e-da1a-4cdf-bb9c-b3549764c93c', NOW());


-- 7. Trackings
-- Tracking for the Bike (Bob selling, Charlie buying) - IN_PROGRESS
-- Annonce: b3ad6d4f-645e-4432-a68e-c25f5b3183d2 (Bob's Bike)
-- Seller (Accepter): 338715f7-2186-4760-93e2-93ee0cb70eac (Bob)
-- Buyer (Creator): d1a76ab7-bcbd-4cbd-9981-e745577ffac6 (Charlie)
INSERT INTO trackings (
  id, 
  annonce_id, 
  creator_id, 
  accepter_id, 
  negotiated_price, 
  status, 
  acceptance_deadline, 
  created_at, 
  updated_at
) VALUES (
  '51573592-42aa-40dd-b9a7-3b7339bd5447', 
  'b3ad6d4f-645e-4432-a68e-c25f5b3183d2', 
  'd1a76ab7-bcbd-4cbd-9981-e745577ffac6', 
  '338715f7-2186-4760-93e2-93ee0cb70eac', 
  75.00, 
  'IN_PROGRESS', 
  DATE_ADD(NOW(), INTERVAL 24 HOUR), 
  NOW(), 
  NOW()
);

-- Tracking for the Sofa (Alice seling, Bob buying) - COMPLETED
-- Annonce: 68469a84-17fa-41f1-80e6-52c21fbd28ce (Alice's Sofa)
-- Seller (Accepter): 2c39e4bd-11d6-45e2-bf99-7239623e4cf7 (Alice)
-- Buyer (Creator): 338715f7-2186-4760-93e2-93ee0cb70eac (Bob)
INSERT INTO trackings (
  id, 
  annonce_id, 
  creator_id, 
  accepter_id, 
  negotiated_price, 
  status, 
  acceptance_deadline, 
  creator_accepted_at,
  accepter_accepted_at,
  creator_completed_at,
  accepter_confirmed_at,
  created_at, 
  updated_at
) VALUES (
  'ff1a81c8-d6c7-4435-bc43-56d6cd960541', 
  '68469a84-17fa-41f1-80e6-52c21fbd28ce', 
  '338715f7-2186-4760-93e2-93ee0cb70eac', 
  '2c39e4bd-11d6-45e2-bf99-7239623e4cf7', 
  140.00, 
  'COMPLETED', 
  DATE_SUB(NOW(), INTERVAL 2 DAY), 
  DATE_SUB(NOW(), INTERVAL 3 DAY),
  DATE_SUB(NOW(), INTERVAL 3 DAY),
  DATE_SUB(NOW(), INTERVAL 1 DAY),
  DATE_SUB(NOW(), INTERVAL 1 DAY),
  DATE_SUB(NOW(), INTERVAL 4 DAY), 
  DATE_SUB(NOW(), INTERVAL 1 DAY)
);
