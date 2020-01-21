const replace = require("replace-in-file");
const calculator = require("./calculator");
;


const max_connections_Changer = (configFile, max_connectionsCurrent ) => {
  const changer = replace.sync({
    files: configFile,
    from: `max_connections = ${max_connectionsCurrent}`,
    to: `max_connections = ${calculator.maxconnections_newValue}`
  });


  console.log(changer[0].hasChanged)
};

const shared_buffers_Changer = (configFile, shared_buffersCurrent ) => {
  const changer = replace.sync({
    files: configFile,
    from: `shared_buffers = ${shared_buffersCurrent}`,
    to: `shared_buffers = ${calculator.sharedbuffers_newValue}`
  });

  console.log(changer[0].hasChanged)
};

const work_mem_Changer = (configFile, work_memCurrent ) => {
  const changer = replace.sync({
    files: configFile,
    from: `#work_mem = ${work_memCurrent}`,
    to: `work_mem = ${calculator.workmem_newValue}`
  });


  if (!changer[0].hasChanged) {
    const changer = replace.sync({
      files: configFile,
      from: `work_mem = ${work_memCurrent}`,
      to: `work_mem = ${calculator.workmem_newValue}`
    });
    console.log(changer[0].hasChanged)
  }
  else {
    console.log(changer[0].hasChanged)
  }
};


const maintenance_work_mem_Changer = (configFile, maintenance_work_memCurrent) => {
  const changer = replace.sync({
    files: configFile,
    from: `#maintenance_work_mem = ${maintenance_work_memCurrent}`,
    to: `maintenance_work_mem = ${calculator.maintenanceworkmem_newValue}`
  });
  
  if (!changer[0].hasChanged) {
    const changer = replace.sync({
      files: configFile,
      from: `maintenance_work_mem = ${maintenance_work_memCurrent}`,
      to: `maintenance_work_mem = ${calculator.maintenanceworkmem_newValue}`
    });
    console.log(changer[0].hasChanged)
  }
  else {
    console.log(changer[0].hasChanged)
  }
};

const effective_cache_size_Changer = (configFile, effective_cache_sizeCurrent) => {
  const changer = replace.sync({
    files: configFile,
    from: `#effective_cache_size = ${effective_cache_sizeCurrent}`,
    to: `effective_cache_size = ${calculator.effectivecachesize_newValue}`
  });

  if (changer[0].hasChanged === false) {
    const changer = replace.sync({
      files: configFile,
      from: `effective_cache_size = ${effective_cache_sizeCurrent}`,
      to: `effective_cache_size = ${calculator.effectivecachesize_newValue}`
    });
  
    console.log(changer[0].hasChanged)
  }

};



module.exports = {
  max_connections_Changer,
  shared_buffers_Changer,
  work_mem_Changer,
  maintenance_work_mem_Changer,
  effective_cache_size_Changer
};
