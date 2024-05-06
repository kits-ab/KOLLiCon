FROM --platform=linux/amd64 openjdk:21
WORKDIR /app
COPY build/libs/kollicon-0.0.1-SNAPSHOT.jar /app/kollicon.jar
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["java", "-jar", "kollicon.jar"]