create table product_table
(
    id          int auto_increment,
    owner_id    int          not null,
    name        varchar(255) not null,
    price       decimal      not null,
    description varchar(255) not null,
    image_url   varchar(255) not null,
    category    varchar(255) not null,
    constraint product_table_pk
        primary key (id),
    constraint product_table_user_table_id_fk
        foreign key (owner_id) references user_table (id)
);

create unique index product_table_id_uindex
    on product_table (id);