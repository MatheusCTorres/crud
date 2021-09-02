create database crud;
use crud;
describe reviews_movies;

create table reviews_movies(
id int primary key not null auto_increment,
movieName varchar(200) not null,
movieReview text not null
);

