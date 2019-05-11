CREATE TABLE `wallet`.`user` (
  `idx` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(320) NOT NULL,
  `encrypted` VARCHAR(45) NOT NULL,
  `create_dt` DATETIME NOT NULL,
  `confirm_dt` DATETIME NULL,
  `confirm` BIT NOT NULL DEFAULT false,
  PRIMARY KEY (`idx`));

CREATE TABLE `wallet`.`user_confirm` (
  `user_idx` BIGINT NOT NULL,
  `code` INT NOT NULL,
  `expire_dt` DATETIME NOT NULL,
  PRIMARY KEY (`user_idx`),
  INDEX `IDX_CODE` (`code` ASC));

CREATE TABLE `wallet`.`account` (
  `idx` BIGINT NOT NULL AUTO_INCREMENT,
  `user_idx` BIGINT NOT NULL,
  `address` VARCHAR(42) NOT NULL,
  `priv_key` VARCHAR(33) NOT NULL,
  `encrypted` VARCHAR(64) NOT NULL,
  `create_dt` DATETIME NOT NULL,
  PRIMARY KEY (`idx`),
  INDEX `IDX_1` (`user_idx` ASC, `create_dt` ASC));
