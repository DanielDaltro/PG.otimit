# PG.otimit
Ferramenta de Tuning do banco de dados *PostgreSQL* na versão 9.6. 

O *PG.otimit* calcula e edita os seguintes parâmetros do banco: 

**PARÂMETROS DE MEMÓRIA**

# shared_buffers: 
> Define o número de buffers de memória compartilhada usados ​​pelo servidor de banco de dados.

# work_mem: 
> Controla a quantidade de memória que pode ser usada por operação de consulta e geralmente é usada para classificar dados e tabelas de hash.

# maintenance_work_mem: 
> Este determina a quantidade máxima de memória usada para operações de manutenção, como VACUUM, CREATE INDEX, ALTER TABLE ADD FOREIGN  KEYoperações e dados de carga.

# effective_cache_size: 
> Este parâmetro, na verdade, não reserva nenhuma memória, mas é usado pelo PostgreSQL no planejamento de consultas. 
