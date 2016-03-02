create table user(
	userid int primary key auto_increment,
	username varchar(20),
	password varchar(20),
	phonenum varchar(20),
	address varchar(80)
	
);

alter table user modify phonenum varchar(20);
alter table user modify password varchar(40);
insert into user(username,password,phonenum,address)
values('Katherine','123','15122358232','Hangzhou City in Zhejiang')
insert into user(username,password,phonenum,address)
values('Lena','123','10086','nanjing City in Jiangsu')
update user set address = 'Nanjing City in Jiangsu'where userid=2
select * from users
drop table user
