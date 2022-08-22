create table product_table
(
    ID          int auto_increment
        primary key,
    name        varchar(255) not null,
    price       int          not null,
    description varchar(255) null,
    owned_id    int          not null,
    constraint product_table_ID_uindex
        unique (ID),
    constraint owner_id
        foreign key (owned_id) references user_table (id)
);

