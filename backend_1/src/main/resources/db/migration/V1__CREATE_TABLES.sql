create table authorities (
    authority_id serial primary key,
    permission varchar(30)
);

create table accounts (
    account_id serial primary key,
    username varchar(30),
    encoded_password varchar(100),
    first_name varchar(50),
    last_name varchar(50),
    gender varchar(10)
);

create table accounts_authorities (
    account_id int references accounts (account_id),
	authority_id int references authorities (authority_id),
	primary key (account_id, authority_id)
);

CREATE TABLE target_customer
(
    index integer NOT NULL primary key,
    customer character varying COLLATE pg_catalog."default"
);

INSERT INTO target_customer(
	index, customer)
	VALUES (0, 'for women'),
			(1, 'for men'),
			(2, 'for women and men'),
			(3, NULL)
;

CREATE TABLE perfume
(
    perfume_id serial NOT NULL primary key,
    perfume_name character varying COLLATE pg_catalog."default",
    brand character varying COLLATE pg_catalog."default",
    date integer,
    image character varying COLLATE pg_catalog."default",
    description character varying COLLATE pg_catalog."default",
    target integer references target_customer(index)
);

CREATE TABLE notes
(
    note_id serial NOT NULL primary key,
    note_name character varying COLLATE pg_catalog."default" NOT NULL,
    image character varying COLLATE pg_catalog."default"
);

create table note_in_perfume(
	perfume_id int references perfume(perfume_id),
	note_id int references notes(note_id),
	primary key (perfume_id,note_id)
);

create table accounts_notes (
    account_id int references accounts (account_id),
	note_id int references notes (note_id),
	primary key (account_id, note_id)
);

create table bookmarks (
    account_id int references accounts (account_id),
	perfume_id int references perfume(perfume_id),
	primary key (account_id, perfume_id)
);

create table reviews (
    review_id serial NOT NULL primary key,
    account_id int references accounts (account_id),
	perfume_id int references perfume(perfume_id),
	if_like boolean NOT NULL,
	rating int NOT NULL,
	review character varying COLLATE pg_catalog."default" NOT NULL
);