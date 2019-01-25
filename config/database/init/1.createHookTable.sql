CREATE TABLE IF NOT EXISTS `hook` (
  `id` CHAR(36)  NOT NULL,
  `name` VARCHAR(40) NOT NULL,
  `platform` VARCHAR(40) NOT NULL,
  `repository_url` VARCHAR(200) NOT NULL,
  `branch` VARCHAR(100) NOT NULL,
  `event` VARCHAR(100) NOT NULL,
  `token` text NOT NULL,
  `run` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
