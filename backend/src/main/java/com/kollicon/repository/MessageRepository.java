package com.kollicon.repository;

import com.kollicon.model.MessageModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository  extends JpaRepository<MessageModel, Long> {
}
