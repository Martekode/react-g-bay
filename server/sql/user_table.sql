create table user_table
(
    id       int auto_increment
        primary key,
    username char(15)     not null,
    password varchar(255) not null,
    email    varchar(255) not null,
    constraint user_table_id_uindex
        unique (id),
    constraint user_table_username_uindex
        unique (username)
);
