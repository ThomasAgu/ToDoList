/* Creating the dataBase */
CREATE DATABASE IF NOT EXISTS `todolist_mysql` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `todolist_mysql`;

/* Creating the tables */
/* user  */
CREATE TABLE IF NOT EXISTS `user`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `pass` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `category`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `user_id` int(11) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY (user_id) REFERENCES user(id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `todos`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `user_id` int(11) NOT NULL,
    `category_id` int(11) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

/* Adding an admin :D */
INSERT INTO `user` (`name`, `pass`) VALUES
    ('admin', MD5('admin'));

/* Addingo categories and todos to admin :D */
INSERT INTO `category` (`name`, `user_id`) VALUES
    ('ejercicio', '4'),
    ('estudiar', '4'),
    ('descubrir el sentido de la vida', '4');

INSERT INTO `todos` (`name`, `user_id`, `category_id`) VALUES
    ('abdominales','4','4'),
    ('dominadas','4','4'),
    ('matematicas','4','5'),
    ('metanfetaminas','4','5'),
    ('fumar faso','4','6'),
    ('tomar keta','4','6');