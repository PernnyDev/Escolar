create database escola;
use escola;
create table turma(
    id_turma int not null auto_increment primary key,
    descricao varchar(50),
    createdAt datetime,
    updatedAt datetime
);
create table aluno(
    id_aluno int not null auto_increment primary key,
    matricula integer,
    nome varchar(100),
    fk_turma int,
    createdAt datetime,
    updatedAt datetime,
    INDEX aluno_FKIndex1(fk_turma),
    FOREIGN KEY(fk_turma) REFERENCES turma(id_turma) ON DELETE NO ACTION ON UPDATE NO ACTION
);
insert into turma
values(default, "Informática", now(), now());
insert into turma
values(default, "Recursos Humanos", now(), now());
insert into aluno
values(default, 04453, 'Jose', 1, now(), now());
insert into aluno
values(default, 04454, 'Matheus', 2, now(), now());
insert into aluno
values(default, 04455, 'Guilherme', 1, now(), now());
insert into aluno
values(default, 04456, 'Gael', 2, now(), now());
select *
from turma;
select *
from aluno;
select a.id_aluno as id_aluno,
    a.matricula as matricula,
    a.nome as nome,
    t.descricao
from aluno as a
    inner join turma as t on a.fk_turma = t.id_turma;
create view selecAluno as
select a.id_aluno as id_aluno,
    a.matricula as matricula,
    a.nome as nome,
    t.descricao
from aluno as a
    inner join turma as t on a.fk_turma = t.id_turma;
select *
from selecAluno;