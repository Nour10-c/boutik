INSERT INTO "product" ("slug", "name", "description", "price", "active", "stock") VALUES
('nike-air-force-1-07', 'Nike Air Force 1 ''07', 'La référence des sneakers en cuir blanc : tige lisse, semelle Air et allure intemporelle pour tous les jours.', 119.95, true, 42),
('air-jordan-1-low', 'Air Jordan 1 Low', 'Version basse de la mythique Air Jordan 1, en cuir blanc, noir et rouge varsity, avec semelle Air pour un bon amorti.', 129.95, true, 8),
('adidas-stan-smith', 'adidas Stan Smith', 'Le classique du tennis devenu icône : cuir blanc, talon vert et perforations trois bandes sur les côtés.', 99.95, true, 25),
('adidas-samba-og', 'adidas Samba OG', 'Née sur les terrains de football en salle, la Samba allie tige en cuir noir, bandes blanches et semelle gomme.', 89.95, true, 15),
('converse-chuck-70', 'Converse Chuck 70', 'La Chuck Taylor premium en toile noire : semelle plus épaisse, coussin OrthoLite et finitions vintage.', 94.95, true, 0),
('new-balance-550', 'New Balance 550', 'Inspirée du basket des années 80, la 550 mêle cuir blanc, détails verts et silhouette rétro.', 119.95, true, 12),
('new-balance-574', 'New Balance 574', 'Un modèle running rétro en daim et mesh gris, confortable et facile à associer.', 119.95, true, 60),
('vans-old-skool', 'Vans Old Skool', 'La skate shoe noire à bande blanche : toile et daim résistants, semelle gaufrée et lacets blancs.', 64.95, true, 3),
('puma-suede-classic', 'Puma Suede Classic XXI', 'Le daim noir iconique de Puma, avec sa bande latérale et sa semelle en caoutchouc blanc.', 79.95, true, 30),
('asics-gel-1130', 'ASICS Gel-1130', 'Sneaker running des années 2000 en mesh blanc et détails noirs, avec amorti GEL au talon.', 99.95, true, 7),
('reebok-club-c-85', 'Reebok Club C 85', 'Le tennis des années 80 en cuir blanc, logo et drapeau vert sur le côté, semelle crantée.', 99.95, false, 22),
('nike-dunk-low', 'Nike Dunk Low', 'Le Dunk Low en cuir blanc et noir, silhouette basketball des années 80 devenue incontournable de la rue.', 119.95, true, 18);

INSERT INTO "product_image" ("product_id", "position", "link")
SELECT p."id", v."position", v."link"
FROM (VALUES
('nike-air-force-1-07', 1, 'https://img01.ztat.net/article/spp-media-p1/0117d3f555064d619547338470ec2fcb/5aa562bb0b4b49d5bbabd3c1cd81a5d5.jpg?imwidth=762&filter=packshot'),
('nike-air-force-1-07', 2, 'https://img01.ztat.net/article/spp-media-p1/567252d674464b509b8f98c06a364976/909c220e206147e8838405819959cf32.jpg?imwidth=762'),
('nike-air-force-1-07', 3, 'https://img01.ztat.net/article/spp-media-p1/27b1f2178f2d403698ef197ea2134203/0281b3625e2740dfacab186f176fbaef.jpg?imwidth=762'),
('air-jordan-1-low', 1, 'https://img01.ztat.net/article/spp-media-p1/d34c30554769408b82ab75b79bda3d70/6dd8204affba4335882633e6efa0ba60.jpg?imwidth=762&filter=packshot'),
('air-jordan-1-low', 2, 'https://img01.ztat.net/article/spp-media-p1/783e56fbf8624fbc814c8453203bfcb4/b4ffa927aca24e80aeb4a87c49e10d82.jpg?imwidth=762'),
('air-jordan-1-low', 3, 'https://img01.ztat.net/article/spp-media-p1/7ed5c69b67e7453d94dd91b4778255d6/1b66345183964f41aa911800ebc2df9d.jpg?imwidth=762'),
('adidas-stan-smith', 1, 'https://img01.ztat.net/article/spp-media-p1/8d7eb5c335dd400da9c947b3bb617c14/d5997802d9cf48a8a6f1244f0271bfbe.jpg?imwidth=762&filter=packshot'),
('adidas-stan-smith', 2, 'https://img01.ztat.net/article/spp-media-p1/3a2eda6b4fab48f299d1b37f4bc56fbc/459f24c1ff0f4adfa06aeb88c3012ca2.jpg?imwidth=762'),
('adidas-stan-smith', 3, 'https://img01.ztat.net/article/spp-media-p1/c197cd58fb794e948e5b3d1a6938e525/51935a63200f4ebcb4ff164a2579a8f5.jpg?imwidth=762'),
('adidas-samba-og', 1, 'https://img01.ztat.net/article/spp-media-p1/4411f42735ce46faac3e188e32eac3f0/26e71081190c4f61b1be3342eba6d550.jpg?imwidth=762&filter=packshot'),
('adidas-samba-og', 2, 'https://img01.ztat.net/article/spp-media-p1/9298483a27514b2c8e37f4420d499896/099a6b8d9ebf4463b4f8bac66af58226.jpg?imwidth=762'),
('adidas-samba-og', 3, 'https://img01.ztat.net/article/spp-media-p1/377c474a559e4f8c855c1da239cf4791/0f8240222c9a4f16b484fea2da4d8cad.jpg?imwidth=762'),
('converse-chuck-70', 1, 'https://img01.ztat.net/article/spp-media-p1/5a73bd4ad4c5455bb039918d631bd30d/3fe460b7dde54f3794e2023ffb954e69.jpg?imwidth=762&filter=packshot'),
('converse-chuck-70', 2, 'https://img01.ztat.net/article/spp-media-p1/f161a36999b0458b8713668a918fe991/6c470310f4074180a47609dc4b8aa445.jpg?imwidth=762'),
('converse-chuck-70', 3, 'https://img01.ztat.net/article/spp-media-p1/e17c17be6844415fa0da35bebeefd3ea/46364dc8dbbd464db723b4395841d0ac.jpg?imwidth=762'),
('new-balance-550', 1, 'https://img01.ztat.net/article/spp-media-p1/0e2a925654064db484d0e33dac7a160d/a26c5c8886184904a2dc83ef443a35fb.jpg?imwidth=762&filter=packshot'),
('new-balance-550', 2, 'https://img01.ztat.net/article/spp-media-p1/665f6208249a4e34a77eef6a1df4ed2f/141bc88d15704ad98308128e3b11d983.jpg?imwidth=762'),
('new-balance-550', 3, 'https://img01.ztat.net/article/spp-media-p1/ad098b4e4e284f308382670d381ba8e5/5fca1830f3d442b4a484eb17ad3228eb.jpg?imwidth=762'),
('new-balance-574', 1, 'https://img01.ztat.net/article/spp-media-p1/a1da2ca11f594283bd5f9f24f80d304f/350b47c665334382914023a9faed5e0b.jpg?imwidth=762&filter=packshot'),
('new-balance-574', 2, 'https://img01.ztat.net/article/spp-media-p1/9c800abe091944569f1258b01cdf1e87/840ab5d93b0847aba36dd9cd8db414bd.jpg?imwidth=762'),
('new-balance-574', 3, 'https://img01.ztat.net/article/spp-media-p1/a712d2fb23d848a8acc1eff6697774a3/d896f9c8be42454b8fead77df4b54668.jpg?imwidth=762'),
('vans-old-skool', 1, 'https://img01.ztat.net/article/spp-media-p1/c6ef5e0a73414843b19baccfb37104fe/7fe54495ed32480db861c5e183bdff8a.jpg?imwidth=762&filter=packshot'),
('vans-old-skool', 2, 'https://img01.ztat.net/article/spp-media-p1/9814a35914ad45c5a1518f8d6c5895de/940605fd443c4df484ed1b00a80a5ec1.jpg?imwidth=762'),
('vans-old-skool', 3, 'https://img01.ztat.net/article/spp-media-p1/0253f65679ea462b8f4bd6b6e13aa0f0/c945406a15dd43beb76c1a598e94ba4f.jpg?imwidth=762'),
('puma-suede-classic', 1, 'https://img01.ztat.net/article/spp-media-p1/73b710932e264ccba899a71cf0edb09f/73fbab10dc9c4099978883bb835f20ca.jpg?imwidth=762&filter=packshot'),
('puma-suede-classic', 2, 'https://img01.ztat.net/article/spp-media-p1/c2380f19af7c4a26bf7801d9b9899e2b/fcc8ef4b6c34478681bc34c5e42f785a.jpg?imwidth=762'),
('puma-suede-classic', 3, 'https://img01.ztat.net/article/spp-media-p1/888030558181401b9bf9946bc7a03e37/99f9b17a6e39459e9de5896f7bd4218f.jpg?imwidth=762'),
('asics-gel-1130', 1, 'https://img01.ztat.net/article/spp-media-p1/3bf86a09ec164bd2b5efe228312d4ecb/d6af574047a14d4e89812547fd28b360.jpg?imwidth=762&filter=packshot'),
('asics-gel-1130', 2, 'https://img01.ztat.net/article/spp-media-p1/e09177bbed3243ba980602814d62c03f/4391c5fca7f7410188d7a21f5bcf4ec2.jpg?imwidth=762'),
('asics-gel-1130', 3, 'https://img01.ztat.net/article/spp-media-p1/ca1adeb04cf540e7be9f4e727ebe2ebc/a6a1fd2ffba0481da50ea97e7e0353d2.jpg?imwidth=762'),
('reebok-club-c-85', 1, 'https://img01.ztat.net/article/spp-media-p1/eb7f5722b5d849e0b10f0207da8a9a1f/94e013ec28ea4a41b0f5333fe9046bd5.jpg?imwidth=762&filter=packshot'),
('reebok-club-c-85', 2, 'https://img01.ztat.net/article/spp-media-p1/ede8ca951d91408d8b4d5712c502da22/726eb965370f4632bb5bbe146f58b9fd.jpg?imwidth=762'),
('reebok-club-c-85', 3, 'https://img01.ztat.net/article/spp-media-p1/967b9009bdd14fba8229197dff9cb97d/db7a78414fc94d6894032cd1458a5c54.jpg?imwidth=762'),
('nike-dunk-low', 1, 'https://img01.ztat.net/article/spp-media-p1/ab7dd9b1180e489caa613d2d1f2c3cc3/3c54ffee464649e091907b9b8ce0c073.jpg?imwidth=762&filter=packshot'),
('nike-dunk-low', 2, 'https://img01.ztat.net/article/spp-media-p1/cb09dcf2b2604e1d8c531d8bb2765309/e57af73bf808423ab080c30835f8b0e5.jpg?imwidth=762'),
('nike-dunk-low', 3, 'https://img01.ztat.net/article/spp-media-p1/232474bb07cf4bb89b3a3fa3d3bf73d7/9769e91779ce4669974dfe7827596cef.jpg?imwidth=762')
) AS v("slug", "position", "link")
JOIN "product" p ON p."slug" = v."slug";

SELECT p."slug", p."stock", p."active", COUNT(i."id") AS images
FROM "product" p
LEFT JOIN "product_image" i ON i."product_id" = p."id"
GROUP BY p."id"
ORDER BY p."id";
