# Typescript Clean Architecture

> ⚠️ This project is a example of clean architecture implementation, this isn't a truth about architecture implementation.

## Layer divisions

| Layer        | Contains                                                    |
| ------------ | ----------------------------------------------------------- |
| Core         | Interactor(Use Case), Model, Repository, DTOs and Errors    |
| Data Sources | Repository implementations                                  |
| Adapters     | Presenter and Validator implementations                     |
| Transports   | Applications with any framework for consume the Interactors |

### Core

This layer don't have any dependency of external world, like layers and dependencies(libraries and frameworks).

### Data Sources

This layer represents a collection of adapters for a variety of databases and storage engines.

### Adapters

This layer represents a collection of adapters(Presenters and Validators) to connect layers like the **Transports** with the **Core**.

### Transports

This layer represents a collection of applications which consume the **Core** and define which **Presenter** and **Validators** will be utilized.
