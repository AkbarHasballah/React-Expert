/**
 * - Login spec
 *   - should display login page correctly
 *   - should successfully login with valid credentials
 *   - should show error message with invalid credentials
 *   - should show 'Sign out' button after successful login
 */

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should display login page correctly", () => {
    // Verifikasi bahwa input email, input password, dan tombol login ada di halaman
    cy.get('input[placeholder="Email"]').should("be.visible");
    cy.get('input[placeholder="Kata Sandi"]').should("be.visible");
    cy.get('button').contains(/^Masuk$/).should("be.visible");
  });

  it("should successfully login with valid credentials", () => {
    // Input form login dengan kredensial yang benar
    cy.get('input[placeholder="Email"]').type("salmanaja@gmail.com");
    cy.get('input[placeholder="Kata Sandi"]').type("123123");

    // Submit form login dan verifikasi bahwa login berhasil
    cy.get('button').contains(/^Masuk$/).click();

    // Verifikasi bahwa pengguna dialihkan ke halaman yang tepat setelah login
    cy.url().should('not.include', '/login');
    cy.contains("Login berhasil").should("be.visible");
  });

  it("should show error message with invalid credentials", () => {
    // Input form login dengan kredensial yang salah
    cy.get('input[placeholder="Email"]').type("user@example.com");
    cy.get('input[placeholder="Kata Sandi"]').type("wrongpassword");

    // Submit form login
    cy.get('button').contains(/^Masuk$/).click();

    // Verifikasi bahwa pesan error login muncul
    cy.contains("Login gagal!").should("be.visible");
  });

  it("should show 'Sign out' button after successful login", () => {
    // Input form login dengan kredensial yang benar
    cy.get('input[placeholder="Email"]').type("salmanaja@gmail.com");
    cy.get('input[placeholder="Kata Sandi"]').type("123123");

    // Submit form login dan verifikasi bahwa login berhasil
    cy.get('button').contains(/^Masuk$/).click();

    // Verifikasi bahwa tombol 'Sign out' muncul
    cy.contains("Keluar").should("be.visible");
  });
});
