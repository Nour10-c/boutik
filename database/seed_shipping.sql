INSERT INTO "shipping_offer" ("name", "price") VALUES
('Standard', 4.90),
('Express', 9.90),
('Point relais', 3.50)
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "shipping_company" ("name") VALUES
('Colissimo'),
('Chronopost'),
('Mondial Relay')
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "shipping_company_offer" ("company_id", "offer_id", "cost")
SELECT sc."id", so."id", v."cost"
FROM (VALUES
('Colissimo', 'Standard', 4.20),
('Chronopost', 'Standard', 4.60),
('Mondial Relay', 'Standard', 3.80),
('Colissimo', 'Express', 8.90),
('Chronopost', 'Express', 7.60),
('Mondial Relay', 'Express', 9.50),
('Colissimo', 'Point relais', 3.20),
('Chronopost', 'Point relais', 3.40),
('Mondial Relay', 'Point relais', 2.60)
) AS v("company", "offer", "cost")
JOIN "shipping_company" sc ON sc."name" = v."company"
JOIN "shipping_offer" so ON so."name" = v."offer"
ON CONFLICT ("company_id", "offer_id") DO NOTHING;

SELECT so."name" AS offre, so."price" AS prix_client, sc."name" AS transporteur,
       sco."cost" AS cout, so."price" - sco."cost" AS marge
FROM "shipping_company_offer" sco
JOIN "shipping_company" sc ON sc."id" = sco."company_id"
JOIN "shipping_offer" so ON so."id" = sco."offer_id"
ORDER BY so."name", sco."cost";
