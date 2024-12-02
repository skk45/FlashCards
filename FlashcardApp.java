import java.util.ArrayList;
import java.util.Scanner;

public class FlashcardApp {
    private ArrayList<Flashcard> flashcards;
    private Scanner input;

    public FlashcardApp() {
        flashcards = new ArrayList<>();
        input = new Scanner(System.in);
    }

    public void createFlashcard() {
        System.out.print("Enter the question: ");
        String question = input.nextLine();
        System.out.print("Enter the answer: ");
        String answer = input.nextLine();
        flashcards.add(new Flashcard(question, answer));
        System.out.println("Flashcard created!\n");
    }

    public void testFlashcards(){
        if(flashcards.isEmpty()) {
            System.out.println("No flashcards available to test. ");
            return;
        }

        System.out.println("Testing your knowledge...");
        for(Flashcard flashcard: flashcards) {
            System.out.println("Question: " + flashcard.getQuestion());
            System.out.print("Your Answer: ");
            String userAnswer = input.nextLine() // Reads the user input as a string
                                      .trim() // Removes leading and trailing spaces 
                                      .replaceAll("\\s+", " ") ; // Replaces multiple spaces with a single space 
            
            String correctAnswer = flashcard.getAnswer()
                                    .trim()
                                    .replaceAll("\\s+", " ");

            if (userAnswer.equalsIgnoreCase(correctAnswer))
            {
                System.out.println("Correct!");

            }
            else 
            {
                System.out.println("Incorrect! The correct answer is: " + flashcard.getAnswer());

            }
        }
    }

    public void displayMenu() {
        System.out.println("Flashcard App");
        System.out.println("1. Create a flashcard");
        System.out.println("2. Test your knowledge");
        System.out.println("3. Exit");
        System.out.print("Choose an option: ");
    }

    public static void main(String[] args) {
        FlashcardApp card = new FlashcardApp();
        boolean running = true;

        while(running){
            card.displayMenu();
            String choiceInput = card.input.nextLine(); // Read input as a string
            int choice = -1; // Default invalid choice

            try {
            choice = Integer.parseInt(choiceInput); // Try to convert input to an integer
            } catch (NumberFormatException e) {
            System.out.println("Invalid choice. Please enter a number between 1 and 3.");
            continue; // Skip to the next iteration
            }

            switch (choice){
                case 1:
                    card.createFlashcard();
                    break;
                case 2:
                    card.testFlashcards();
                    break;
                case 3:
                    running = false;
                    System.out.println("Exiting the application. Goodbye!");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } 
    }
}