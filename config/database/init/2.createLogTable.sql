CREATE TABLE IF NOT EXISTS `log` (
  `id` CHAR(36)  NOT NULL,
  `hook_id` CHAR(36) NOT NULL,
  `request` text NOT NULL,
  `response` text NOT NULL,
  `run_log` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
