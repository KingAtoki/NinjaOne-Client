# NinjaOne Client

This is the showcase for NinjaOne to manage devices.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/)

If you're using [nvm](https://github.com/nvm-sh/nvm/) (Node Version Manager), you can switch to the correct Node.js version by running:

```sh
nvm use
```
This will automatically use the Node.js version specified in the .nvmrc file.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/kingatoki/ninjaone-client.git

    cd ninjaone-client
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file with the following content:
    ```env
    VITE_BASE_URL=http://localhost:3000
    ```
    Add the correct url where the backend server is running.

### Running the Project

To start the development server, run:
```sh
npm run dev
```

### Running Tests

To run all tests, run:
```sh
npm run test
```