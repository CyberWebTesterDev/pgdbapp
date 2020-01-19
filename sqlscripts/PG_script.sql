INSERT INTO pgtestdb.public.execution_log(
	row_id_, task_name_, task_id_, start_time_, task_state_, state_time_, process_id_)
	VALUES 
			(9, 'StartEvent', 'se3', '2019-11-27 19:10:00', 0, '2019-11-27 19:10:01', 52),
			(10, 'DOVexecutor2', 'dovexec2', '2019-11-27 19:10:01', 0, '2019-11-27 19:10:17', 52),
			(11, 'InterProcessor', 'intproc3', '2019-11-27 19:10:17', 0, '2019-11-27 19:15:00', 52),
			(12, 'DOVUsertaskListener', 'ulistener3', '2019-11-27 19:15:00', 0, '2019-11-27 23:14:31', 52),
			(13, 'DOVserviceprocessing', 'dovroc2', '2019-11-27 23:14:32', 1, null, 52),
			
			(14, 'StartEvent', 'se3', '2019-11-27 19:02:00', 0, '2019-11-27 19:02:01', 17),
			(15, 'DOVexecutor2', 'dovexec2', '2019-11-27 19:02:01', 0, '2019-11-27 19:02:20', 17),
			(16, 'InterProcessor', 'intproc3', '2019-11-27 19:02:20', 2, '2019-11-27 19:12:15', 17)
			(17, 'InterProcessor', 'intproc3', '2019-11-27 19:02:20', 2, '2019-11-27 19:12:15', 17)
			
	INSERT INTO pgtestdb.public.execution_log(
	row_id_, task_name_, task_id_, start_time_, task_state_, state_time_, process_id_)
	VALUES (17, 'InterProcessor', 'intproc3', '2019-11-27 19:20:00', 2, '2019-11-27 19:40:15', 17) 	
	
update pgtestdb.public.execution_log set task_state_ = 0 where row_id_ = 16
			
ALTER TABLE pgtestdb.public.execution_log ALTER COLUMN task_name_ TYPE varchar(50), ALTER COLUMN task_id_ TYPE varchar(30)


INSERT INTO pgtestdb.public.states(
	id_, code_, description)
	VALUES (1, 0, 'Execution is completed'),
	(2, 1, 'Execution is running'),
	(3, 2, 'Execution has been unexpectedly stopped'),
	(4, 3, 'Awaiting for user action')
	
INSERT INTO pgtestdb.public.variables(
	id_, name_, value_, process_id_)
	VALUES 
	('7aa', 'userinputed', 'system', 24),
	('8aa', 'appnumber', '200117', 24),
	('9aa', 'method', 'checkData', 24),
	('fr', 'sourcetype', 'inner', 24),
	('11a', 'next_scheme', 'Data_overview', 24)
	
INSERT INTO pgtestdb.public.variables(
	id_, name_, value_, process_id_)
	VALUES 
	('aa7', 'userinputed', 'system', 17),
	('aa8', 'appnumber', '200122', 17),
	('aa9', 'method', 'getData', 17),
	('ab1', 'sourcetype', 'inner', 17),
	('ab2', 'next_scheme', 'Next_scheme', 17)	
	
insert into pgtestdb.public.application(id_, application_number, channel, creation_date, status)
values
(15, 200122, 'DO', '2019-11-27 19:02:00', 'Error')
	
ALTER TABLE pgtestdb.public.application ALTER COLUMN application_number TYPE numeric(10)	

delete from pgtestdb.public.execution_log where process_id_ = 24


select * from pgtestdb.public.application
		
select * from pgtestdb.public.process_instances

select * from pgtestdb.public.variables

select * from pgtestdb.public.execution_log where process_id_ = 17 order by start_time_ asc

select * from pgtestdb.public.execution_log order by start_time_ asc

select b.value_ as "Номер заявки", c.scheme_name, a.task_name_, a.start_time_, a.task_state_, 
c.id_ as "process id", a.state_time_ 
from pgtestdb.public.execution_log a, pgtestdb.public.variables b, pgtestdb.public.process_instances c
where a.process_id_ = b.process_id_
and c.id_ = a.process_id_
and b.name_ = 'appnumber'
--and a.task_state_ = 2
and b.value_ = '200122'
order by start_time_ asc





select c.scheme_name, c.id_
from pgtestdb.public.variables b, pgtestdb.public.process_instances c
where c.id_ = b.process_id_
and b.name_ = 'appnumber'
and b.value_ = '200122'




