create table user_table
(
    id        int auto_increment,
    name      varchar(255) not null,
    password  varchar(255) not null,
    email     varchar(255) not null,
    image_url varchar(255) null,
    constraint user_table_pk
        primary key (id)
);

create unique index user_table_email_uindex
    on user_table (email);

create unique index user_table_id_uindex
    on user_table (id);

create unique index user_table_name_uindex
    on user_table (name);
