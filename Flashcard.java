import java.io.Serializable;

class Flashcard implements Serializable {
    private static final long serialVersionUID = 1L;
    private String question;
    private String answer;

    public Flashcard(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    @Override
    public String toString() {
        return "Question: " + question + " | Answer: " + answer;
    }
}
