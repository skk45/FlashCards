import java.util.ArrayList;
import java.util.Scanner;

class Flashcard{
    private String question;
    private String answer;

    private Flashcard(String question, String answer)
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
}


