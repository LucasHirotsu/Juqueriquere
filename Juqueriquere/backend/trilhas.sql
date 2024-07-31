CREATE DATABASE Juqueriquere;

USE Juqueriquere;

CREATE TABLE trilhas (
  idtrilhas INT NOT NULL AUTO_INCREMENT,
  nome TEXT(150) NOT NULL,
  local LONGTEXT NOT NULL,
  extensao DECIMAL NOT NULL,
  altitude DECIMAL NULL,
  duracao INT NOT NULL,
  dificuldade INT NOT NULL,
  monitoria INT NOT NULL,
  caracteristicas LONGTEXT NOT NULL,
  descricao TEXT(255) NOT NULL,
  agendamento TINYINT NOT NULL,
  horario LONGTEXT NOT NULL,
  imagem TEXT(255) NULL,
  destaque TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idtrilhas`)
) ENGINE = InnoDB;
