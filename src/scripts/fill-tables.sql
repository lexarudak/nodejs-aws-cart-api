INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES
    ('8d44f616-e49e-4ad6-aa93-b0c3d9622b1a', 'c8f182bc-3b78-4be5-8c37-6cbfa56c8a19', NOW(), NOW(), 'OPEN'),
    ('d32fcc54-7b48-4c14-ae33-6c0869375b90', 'd7abcbba-71c6-44c3-9df1-3b7be32660f4', NOW(), NOW(), 'ORDERED');

INSERT INTO cart_items (id, cart_id, product_id, count)
VALUES
    ('1f7bf173-c07d-44a5-bd29-2e9c96001ddf', '8d44f616-e49e-4ad6-aa93-b0c3d9622b1a', 'd5e59f73-ff9b-4f4d-aa0c-8f2997a959c5', 3),
    ('8f206c54-3cef-4e4d-91d2-98889c92258c', '8d44f616-e49e-4ad6-aa93-b0c3d9622b1a', '02a16630-7c98-4723-8373-eb627972d60b', 5),
    ('b857582e-5bde-43b9-8744-5f4a8ff4f994', 'd32fcc54-7b48-4c14-ae33-6c0869375b90', '2bcbb288-f9c1-4cb8-819e-8233d21c12dc', 1);