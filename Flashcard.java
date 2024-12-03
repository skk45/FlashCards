 import java.io.*;
 import java.util.ArrayList;
 import java.util.Scanner;

class Flashcard implements Serializable{
    private static final long serialVersionUID = 1L;  // Ensure compatibility during deserialization
    private String question;
    private String answer;

    public Flashcard(String question, String answer)
    {
        this.question = question;
        this.answer = answer;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public String toString() {
        return "Question: " + question + " | Answer: " + answer;
    }

}

