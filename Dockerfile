FROM php:7.4-apache

ARG CI_PROJECT_NAME
ENV CI_PROJECT_NAME=$CI_PROJECT_NAME

WORKDIR /var/www/html

RUN a2enmod rewrite

COPY . .
