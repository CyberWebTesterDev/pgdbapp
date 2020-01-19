module.exports.sqlext = 

sqlext = {

    text: `select b.value_, c.scheme_name, a.task_name_, a.start_time_, a.task_state_, 
    c.id_, a.state_time_ 
    from pgtestdb.public.execution_log a, pgtestdb.public.variables b, pgtestdb.public.process_instances c
    where a.process_id_ = b.process_id_
    and c.id_ = a.process_id_
    and b.name_ = 'appnumber'
    and b.value_ = $1::text
    order by start_time_ asc`,
    values: []
    
    };


module.exports.sqltest = 

    sqltest = {

        text: `select c.scheme_name
        from pgtestdb.public.variables b, pgtestdb.public.process_instances c
        where c.id_ = b.process_id_
        and b.name_ = 'appnumber'
        and b.value_ = $1::text`,
        values: []
        
        };