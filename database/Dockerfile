FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD pass  
ENV MYSQL_DATABASE treedb  
ENV MYSQL_USER user  
ENV MYSQL_PASSWORD pass

ADD setup.sql /docker-entrypoint-initdb.d