import java.io.*;
import java.util.ArrayList;
import java.util.Scanner;

public class FlashcardApp {
    private ArrayList<Flashcard> flashcards;
    private Scanner input;

    public FlashcardApp() {
        flashcards = new ArrayList<>();
        input = new Scanner(System.in);
        loadFlashcards();
    }

    public void createFlashcard() {
        System.out.print("Enter the question: ");
        String question = input.nextLine();
        System.out.print("Enter the answer: ");
        String answer = input.nextLine();
        flashcards.add(new Flashcard(question, answer));
        System.out.println("Flashcard created!\n");
        saveFlashcards();
    }

    public void deleteFlashcard() {
        if (flashcards.isEmpty()) {
            System.out.println("No flashcards to delete.");
            return;
        }

        System.out.println("Here are your flashcards: ");
        for (int i = 0; i < flashcards.size(); i++) {
            System.out.println((i + 1) + ". Question: " + flashcards.get(i).getQuestion());
        }

        System.out.print("Enter the number of the flashcard to delete (or 0 to cancel): ");
        int choice;
        try {
            choice = Integer.parseInt(input.nextLine());
        } catch (NumberFormatException e) {
            System.out.println("Invalid input. Returning to the menu.");
            return;
        }

        if (choice == 0) {
            System.out.println("Returning to the main menu.");
            return;
        }

        if (choice > 0 && choice <= flashcards.size()) {
            flashcards.remove(choice - 1);
            System.out.println("Flashcard deleted!\n");
            saveFlashcards();
        } else {
            System.out.println("Invalid choice. Returning to the menu.");
        }
    }

    public void testFlashcards() {
        if (flashcards.isEmpty()) {
            System.out.println("No flashcards available to test.");
            return;
        }

        System.out.println("Testing your knowledge...");
        for (Flashcard flashcard : flashcards) {
            System.out.println("Question: " + flashcard.getQuestion());
            System.out.print("Your Answer: ");
            String userAnswer = input.nextLine().trim();

            if (userAnswer.equalsIgnoreCase(flashcard.getAnswer().trim())) {
                System.out.println("Correct!");
            } else {
                System.out.println("Incorrect! The correct answer is: " + flashcard.getAnswer());
            }
        }
    }

    public void saveFlashcards() {
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("flashcards.ser"))) {
            out.writeObject(flashcards);
            System.out.println("Flashcards saved successfully.");
        } catch (IOException e) {
            System.out.println("Error saving flashcards: " + e.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    public void loadFlashcards() {
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("flashcards.ser"))) {
            flashcards = (ArrayList<Flashcard>) in.readObject();
            System.out.println("Flashcards loaded successfully.");
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("No saved flashcards found.");
        }
    }

    public void displayMenu() {
        System.out.println("\nFlashcard App");
        System.out.println("1. Create a flashcard");
        System.out.println("2. Test your knowledge");
        System.out.println("3. Delete a flashcard");
        System.out.println("4. Exit");
        System.out.print("Choose an option: ");
    }

    public static void main(String[] args) {
        FlashcardApp app = new FlashcardApp();
        boolean running = true;

        while (running) {
            app.displayMenu();
            String choiceInput = app.input.nextLine();
            int choice;

            try {
                choice = Integer.parseInt(choiceInput);
            } catch (NumberFormatException e) {
                System.out.println("Invalid choice. Please enter a number between 1 and 4.");
                continue;
            }

            switch (choice) {
                case 1:
                    app.createFlashcard();
                    break;
                case 2:
                    app.testFlashcards();
                    break;
                case 3:
                    app.deleteFlashcard();
                    break;
                case 4:
                    running = false;
                    System.out.println("Exiting the application. Goodbye!");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }
}
