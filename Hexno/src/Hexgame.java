import java.awt.*;
import javax.swing.*;
import java.awt.event.*;

/**********************************
 This is the main class of a Java program to play a game based on hexagonal tiles.
 The mechanism of handling hexes is in the file Hexmech.java.
 Written by: M.H.
 Date: December 2012
 ***********************************/

public class Hexgame
{
    private Hexgame() {
        initGame();
        createAndShowGUI();
    }

    public static void main(String[] args)
    {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new Hexgame();
            }
        });
    }

    //constants and global variables
    final static Color COLOURBACK =  Color.WHITE;
    final static Color COLOURCELL =  Color.ORANGE;
    final static Color COLOURGRID =  Color.BLACK;
    final static Color COLOURONE = new Color(255,255,255,200);
    final static Color COLOURONETXT = Color.BLUE;
    final static Color COLOURTWO = new Color(0,0,0,200);
    final static Color COLOURTWOTXT = new Color(255,100,255);
    final static int EMPTY = 0;
    final static int BWIDTH = 30; //board size.
    final static int BHEIGHT = 15; //board width
    final static int HEXSIZE = 60;	//hex size in pixels
    final static int BORDERS = 15;
    final static int SCRHEIGHT = HEXSIZE * (BHEIGHT + 1) + BORDERS*3; //screen size (vertical dimension).
    final static int SCRWIDTH = HEXSIZE * (BWIDTH + 1) + BORDERS*3; //screen width

    int[][] board = new int[BWIDTH][BHEIGHT];

    void initGame(){

        Hexmech.setXYasVertex(false); //RECOMMENDED: leave this as FALSE.

        Hexmech.setHeight(HEXSIZE); //Either setHeight or setSize must be run to initialize the hex
        Hexmech.setBorders(BORDERS);

        for (int i=0;i<BWIDTH;i++) {
            for (int j=0;j<BHEIGHT;j++) {
                board[i][j]=EMPTY;
            }
        }

        //set up board here
        board[3][3] = (int)'A';
        board[4][3] = (int)'Q';
        board[4][4] = -(int)'B';
    }

    private void createAndShowGUI()
    {
        DrawingPanel panel = new DrawingPanel();


        //JFrame.setDefaultLookAndFeelDecorated(true);
        JFrame frame = new JFrame("Hex Testing 4");
        frame.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
        Container content = frame.getContentPane();
        content.add(panel);
        //this.add(panel);  -- cannot be done in a static context
        //for hexes in the FLAT orientation, the height of a 10x10 grid is 1.1764 * the width. (from h / (s+t))
        frame.setSize( (int)(SCRWIDTH/1.2), SCRHEIGHT);
        frame.setResizable(false);
        frame.setLocationRelativeTo( null );
        frame.setVisible(true);
    }


    class DrawingPanel extends JPanel
    {
        //mouse variables here
        //Point mPt = new Point(0,0);

        public DrawingPanel()
        {
            setBackground(COLOURBACK);

            MyMouseListener ml = new MyMouseListener();
            addMouseListener(ml);
        }

        public void paintComponent(Graphics g)
        {
            Graphics2D g2 = (Graphics2D)g;
            g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g.setFont(new Font("Arial", Font.PLAIN, 20));
            super.paintComponent(g2);
            //draw grid
            for (int i=0;i<BWIDTH;i++) {
                for (int j=0;j<BHEIGHT;j++) {
                    Hexmech.drawHex(i,j,g2);
                }
            }
            //fill in hexes
            for (int i=0;i<BWIDTH;i++) {
                for (int j=0;j<BHEIGHT;j++) {
                    //if (board[i][j] < 0) Hexmech.fillHex(i,j,COLOURONE,-board[i][j],g2);
                    //if (board[i][j] > 0) Hexmech.fillHex(i,j,COLOURTWO, board[i][j],g2);
                    Hexmech.fillHex(i,j,board[i][j],g2);
                }
            }

            //g.setColor(Color.RED);
            //g.drawLine(mPt.x,mPt.y, mPt.x,mPt.y);
        }

        class MyMouseListener extends MouseAdapter	{	//inner class inside DrawingPanel
            public void mouseClicked(MouseEvent e) {
                int x = e.getX();
                int y = e.getY();
                //mPt.x = x;
                //mPt.y = y;
                Point p = new Point( Hexmech.pxtoHex(e.getX(),e.getY()) );
                if (p.x < 0 || p.y < 0 || p.x >= BWIDTH || p.y >= BHEIGHT) return;

                //DEBUG: colour in the hex which is supposedly the one clicked on
                //clear the whole screen first.
				/* for (int i=0;i<BSIZE;i++) {
					for (int j=0;j<BSIZE;j++) {
						board[i][j]=EMPTY;
					}
				} */

                //What do you want to do when a hexagon is clicked?
                board[p.x][p.y] = (int)'X';
                repaint();
            }
        } //end of MyMouseListener class
    } // end of DrawingPanel class
}