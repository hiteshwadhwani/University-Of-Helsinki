describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "hello123",
      name: "kunal",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", () => {
    cy.contains("login");
  });
  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.contains("login").click();
      cy.get("#username").type("hello123");
      cy.get("#password").type("password");
      cy.get("#login-button").click({force: true});

      cy.contains("kunal is logged in");
    });

    it("fails with wrong credentials", () => {
      cy.contains("login").click();
      cy.get("#username").type("hello123");
      cy.get("#password").type("password123");
      cy.get("#login-button").click({force: true});

      cy.contains("invalid username or password");

      cy.get("html").should("not.contain", "kunal is logged in");
    });
  });
  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({username:"hello123",password:"password"})
    })

    it('A blog can be created', () => {
      cy.contains("create new blog").click();
      cy.get("#title").type("new Blog");
      cy.get("#author").type("hello123");
      cy.get("#url").type("hello123");
      cy.get("#likes").type("12");

      cy.get("#submit-button").click();

      cy.contains("new blog added");


    })
    describe("when logged in and blog is added", () => {
      beforeEach(() => {
        
        const blog = {
          title:"new Blog",
          author:"blog123",
          url:"blog@123",
          likes:"12"
        }
        cy.createBlog(blog)
      })
      it("user can like blog" , () => {
        cy.contains('new Blog').find('button').as("theButton")
        cy.get("@theButton").click();
        cy.get('#like-button').click();
        cy.get(".blog-likes").should("not.contain" , "12");
      })
      it("user can delete blog" , () => {
        cy.contains('new Blog').find('button').as("theButton")
        cy.get("@theButton").click();
        cy.contains("delete").click();
        
        cy.get("html").should("not.contain" , "new Blog");
      })
    })
    describe("when multiple blogs are added", () => {
      beforeEach(() => {
        const blog1 = {
          title:"new Blog1",
          author:"blog123",
          url:"blog@123",
          likes:"13"
        }
        const blog2 = {
          title:"new Blog2",
          author:"blog123",
          url:"blog@123",
          likes:"14"
        }
        const blog3 = {
          title:"new Blog3",
          author:"blog123",
          url:"blog@123",
          likes:"1"
        }

        cy.createBlog(blog1);
        cy.createBlog(blog2);
        cy.createBlog(blog3);
      })
      it("blogs are orderd by likes", () => {
        // cy.get(".blog-list").get(".blog-likes").then((list) => {
        //   console.log(list.innerText);
        //   const blogs = list.map((i,el) => {

        //   })
        // })
        cy.get(".blog-list:first").get(".blog-likes").contains("14");
        cy.get(".blog-list:last").get(".blog-likes").contains("1");
      })
    })
    

    
  })
  
});
