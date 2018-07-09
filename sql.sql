CREATE TABLE user_master(
	user_id BIGSERIAL PRIMARY KEY,
	username TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	date_created TIMESTAMP NOT NULL,
	facebook_id TEXT UNIQUE,
	google_id TEXT UNIQUE,
  	session_token INTEGER UNIQUE,
  	image BYTEA,
  	image_ext TEXT
);

CREATE TABLE user_friends_relation(
	user_friends_id BIGSERIAL PRIMARY KEY,
	user_1_id BIGSERIAL REFERENCES user_master(user_id),
	user_2_id BIGSERIAL REFERENCES user_master(user_id)
);

CREATE TABLE clique_master(
	clique_id BIGSERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	description TEXT,
	date_created TIMESTAMP NOT NULL,
	user_id BIGSERIAL REFERENCES user_master(user_id)
);

CREATE TABLE subscribed_clique_relation(
	subscribe_clique_id BIGSERIAL PRIMARY KEY,
	user_id BIGSERIAL REFERENCES user_master(user_id),
	clique_id BIGSERIAL REFERENCES clique_master(clique_id)
);

CREATE TABLE post_master(
	post_id BIGSERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	description TEXT,
	date_created TIMESTAMP NOT NULL,
	clique_id BIGSERIAL REFERENCES clique_master(clique_id),
	user_id BIGSERIAL REFERENCES user_master(user_id)
);

CREATE TABLE comment_master(
	comment_id BIGSERIAL PRIMARY KEY,
	comment TEXT NOT NULL,
	date_created TIMESTAMP NOT NULL,
	user_id BIGSERIAL REFERENCES user_master(user_id),
	post_id BIGSERIAL REFERENCES post_master(post_id)
);

CREATE TABLE reply_master(
	reply_id BIGSERIAL PRIMARY KEY,
	reply TEXT NOT NULL,
	date_created TIMESTAMP NOT NULL,
	user_id BIGSERIAL REFERENCES user_master(user_id),
	comment_id BIGSERIAL REFERENCES comment_master(comment_id)
);

INSERT INTO user_master(username, password, email, date_created)
VALUES
	('Takiiz','9003d1df22eb4d3820015070385194c8','1@mail.com',(TIMESTAMP '2018-01-01 00:00:00')),
	('MrKuabster','9003d1df22eb4d3820015070385194c8','2@mail.com',(TIMESTAMP '2018-01-01 00:00:00')),
	('SeattleMana','9003d1df22eb4d3820015070385194c8','3@mail.com',(TIMESTAMP '2018-01-01 00:00:00')),
	('TomasRoncero','9003d1df22eb4d3820015070385194c8','4@mail.com',(TIMESTAMP '2018-01-01 00:00:00')),
	('Bloodbath-McGrath','9003d1df22eb4d3820015070385194c8','5@mail.com',(TIMESTAMP '2018-01-01 00:00:00')),
	('samuel_smith327','9003d1df22eb4d3820015070385194c8','6@mail.com',(TIMESTAMP '2018-01-01 00:00:00')),
	('LaDiDaDiDaSlobOnMeKn','9003d1df22eb4d3820015070385194c8','7@mail.com',(TIMESTAMP '2018-01-01 00:00:00')),
	('BunyipPouch','9003d1df22eb4d3820015070385194c8','8@mail.com',(TIMESTAMP '2018-01-01 00:00:00')),
	('effennekappa','9003d1df22eb4d3820015070385194c8','9@mail.com',(TIMESTAMP '2018-01-01 00:00:00'))
;

INSERT INTO clique_master(title, description, date_created, user_id) 
VALUES
	('movies','',(TIMESTAMP '2018-01-01 00:00:00'),1),	
	('gaming','',(TIMESTAMP '2018-01-01 00:00:00'),1),	
	('gifs','',(TIMESTAMP '2018-01-01 00:00:00'),1),	
	('soccer','',(TIMESTAMP '2018-01-01 00:00:00'),1),	
	('politics','',(TIMESTAMP '2018-01-01 00:00:00'),1),	
	('all','',(TIMESTAMP '2018-01-01 00:00:00'),1),		
	('todayilearned','',(TIMESTAMP '2018-01-01 00:00:00'),1),	
	('pics','',(TIMESTAMP '2018-01-01 00:00:00'),1)
;

INSERT INTO user_friends_relation(user_1_id, user_2_id)
VALUES
	(1,7),
	(1,8),
	(1,9),
	(2,7),
	(2,8),
	(3,5),
	(4,6),
	(5,7),
	(6,5),
	(7,8),
	(7,9),
	(9,8);

INSERT INTO subscribed_clique_relation(user_id, clique_id) 
VALUES
	(1,1),
	(1,2),
	(1,4),
	(1,5),
	(2,1),
	(2,2),
	(2,3),
	(2,4),
	(2,5),
	(3,6),
	(3,7),
	(3,8),
	(4,1),
	(5,2),
	(5,3),
	(5,5),
	(5,6),
	(6,3),
	(6,4),
	(6,5),
	(7,3),
	(8,3),
	(9,2),
	(9,3),
	(9,6);

INSERT INTO post_master(title, description, date_created, clique_id, user_id) 
VALUES
	('Aquaman : First image of Black Manta','',(TIMESTAMP '2018-06-14 23:53:14'),1,1),	
	('Damn it... It was so close!','',(TIMESTAMP '2018-06-14 23:21:50'),2,2),	
	('How can I halp?','',(TIMESTAMP '2018-06-14 23:25:25'),3,3),	
	('Denis Cheryshev''s second goal vs. Kingdom of Saudi Arabia ([4]-0)','',(TIMESTAMP '2018-06-14 23:52:04'),4,4),	
	('New York files suit against Trump, alleging his charity engaged in ''illegal conduct''','',(TIMESTAMP '2018-06-14 21:39:01'),5,5),	
	('If you proposed in the smoky mnts, and left fake rose petals everywhere I hope she said NO.','',(TIMESTAMP '2018-06-14 22:11:18'),6,6),	
	('TIL Guns and Roses guitarist Slash did not allow the TV show Glee to use any of Guns and Roses'' music despite many attempts from producers. He stated “Glee is worse than Grease and Grease is bad enough.”','',(TIMESTAMP '2018-06-14 21:44:31'),7,7),	
	('Andy Samberg on Returning to NBC With ''Brooklyn Nine-Nine'': ''It Feels Like Home''','',(TIMESTAMP '2018-06-14 22:40:34'),6,8),	
	('I''ve spent 10 years with this 160gb monster in my pocket, it''s been with me in every single trip, journey and commute I''ve made since I was 20. Today it played its last song. Farewell, you magnificent bastard.','',(TIMESTAMP '2018-06-14 22:19:26'),8,9)
;

INSERT INTO comment_master(comment,date_created,user_id,post_id)
VALUES
	('<p>comment-1</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,1),
	('<p>comment-2</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,1),
	('<p>comment-3</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,1),
	('<p>comment-4</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,1),
	('<p>comment-5</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,1),
	('<p>comment-6</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,1),
	('<p>comment-7</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,1),
	('<p>comment-8</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,1),
	('<p>comment-9</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,1),
	('<p>comment-10</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,1),
	('<p>comment-11</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,1),
	('<p>comment-12</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,1);

INSERT INTO reply_master(reply,date_created,user_id,comment_id)
VALUES
	('<p>reply-1</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,1),
	('<p>reply-2</p>',(TIMESTAMP '2018-01-01 00:00:00'),4,2),
	('<p>reply-3</p>',(TIMESTAMP '2018-01-01 00:00:00'),3,2),
	('<p>reply-4</p>',(TIMESTAMP '2018-01-01 00:00:00'),2,2),
	('<p>reply-5</p>',(TIMESTAMP '2018-01-01 00:00:00'),2,4),
	('<p>reply-6</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,5),
	('<p>reply-7</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,6),
	('<p>reply-8</p>',(TIMESTAMP '2018-01-01 00:00:00'),5,6),
	('<p>reply-9</p>',(TIMESTAMP '2018-01-01 00:00:00'),2,6),
	('<p>reply-10</p>',(TIMESTAMP '2018-01-01 00:00:00'),3,6),
	('<p>reply-11</p>',(TIMESTAMP '2018-01-01 00:00:00'),1,6),
	('<p>reply-12</p>',(TIMESTAMP '2018-01-01 00:00:00'),5,6);