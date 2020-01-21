const pg = require("pg");
const configDatabase = require("./database")
const confChanger = require("../controller/replace_in_file");
const child = require('child_process')

class conectionPostgresql {
    constructor(configDatabase, confChanger, child) {
        this.configDatabase = configDatabase;
        this.confChanger = confChanger
        this.client = new pg.Client(configDatabase);
        this.child = child
    }


    connectDatabase() {
        return this.client.connect(err => {
            if (err) throw err;
            else{
                console.log('Conectado na database ...')
                console.log('Executanndo a otimização')
                this.queryDatabase()
                this.restartService()
            }
        })
    }

    async queryDatabase(confChanger) {

        const postgresql_conf = await this.client.query("SHOW config_file");

        // Paramentros
        const max_connectionsCurrent = await this.client.query("SHOW max_connections");
        const shared_buffersCurrent = await this.client.query("SHOW shared_buffers");
        const work_memCurrent = await this.client.query("SHOW work_mem");
        const maintenance_work_memCurrent = await this.client.query("SHOW maintenance_work_mem");
        const effective_cache_sizeCurrent = await this.client.query("SHOW effective_cache_size");
        const random_page_costCurrent = await this.client.query("SHOW random_page_cost");
        const checkpoint_completion_targetCurrent = await this.client.query("SHOW checkpoint_completion_target");
        const wal_buffersCurrent = await this.client.query("SHOW wal_buffers");
        const default_statistics_targetCurrent = await this.client.query("SHOW default_statistics_target");
        const min_wal_sizeCurrent = await this.client.query("SHOW min_wal_size");
        const max_wal_sizeCurrent = await this.client.query("SHOW max_wal_size");
        const max_worker_processesCurrent = await this.client.query("SHOW max_worker_processes");
        const max_parallel_workers_per_gatherCurrent = await this.client.query("SHOW max_parallel_workers_per_gather");




        // Desestruturação dos valores 
        const { config_file } = postgresql_conf.rows[0];
        const { max_connections } = max_connectionsCurrent.rows[0];
        const { shared_buffers } = shared_buffersCurrent.rows[0];
        const { work_mem } = work_memCurrent.rows[0];
        const { maintenance_work_mem } = maintenance_work_memCurrent.rows[0];
        const { effective_cache_size } = effective_cache_sizeCurrent.rows[0];
        const { random_page_cost } = random_page_costCurrent.rows[0];
        const { checkpoint_completion_target } = checkpoint_completion_targetCurrent.rows[0];
        const { wal_buffers } = wal_buffersCurrent.rows[0];
        const { default_statistics_target } = default_statistics_targetCurrent.rows[0];
        const { min_wal_size } = min_wal_sizeCurrent.rows[0];
        const { max_wal_size } = max_wal_sizeCurrent.rows[0];
        const { max_worker_processes } = max_worker_processesCurrent.rows[0];
        const { max_parallel_workers_per_gather } = max_parallel_workers_per_gatherCurrent.rows[0];



        //  Realizando a troca no arquivo postgreSQL
        await this.confChanger.max_connections_Changer(config_file, max_connections);
        await this.confChanger.shared_buffers_Changer(config_file, shared_buffers);
        await this.confChanger.work_mem_Changer(config_file, work_mem);
        await this.confChanger.maintenance_work_mem_Changer(config_file, maintenance_work_mem);
        await this.confChanger.effective_cache_size_Changer(config_file, effective_cache_size);

        this.client.end();
    }

    // Função responsável pela 
    async restartService(){
        await this.child.exec('net stop postgresql-x64-9.6 & net start postgresql-x64-9.6', function (error, stdout, stderr) {
            if (error !== null) {
                console.log('error: ' + error.cmd);
            }
            console.log('Serviço do postgresql-x64-9.6 reiniciado')
        });
    }

}

const app = new conectionPostgresql(configDatabase, confChanger, child)

module.exports = app;
