### Work instructions

This repository is organised as a monorepo, which means that it has an entry point and client and server are made as different projects. They are organised as workspaces, which gives us control over projects from this entry point.

If you need to install dependencies, please install them in the packages where they are needed (going to the client and installing client-based dependencies)

In order to start and install all the dependencies run:

```bash
npm run init-project
```

It will install dependencies in all the workspaces

To build the whole project - run:

```bash
npm run build
```

To start the development process - run:

```bash
npm start
```

### Deployment guide

For the deployment process we are going to use [Render](https://render.com/), deploying our webservice and PostgreSQL database.
For the deployment guide you can always reference to [this link](https://github.com/HackYourFuture-CPH/deployment-guide/blob/main/render-deployment-docs/Deployment.md)

We would be using deployment process to deploy to the production and our `main` branch would be used as a trigger for the deployment.

### Workflow rules

For the workflow we would be working by the `Git Flow` using `Feature branches`
You can reference for the guide [here](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

In short - this means that we would have two main branches `main` and `dev`.
`main` branch would have all the production changes that we want to be deployed.
`dev` branch collects all the latest changes that were made.
If we want to deploy a new version to production, we create a pull request of a `dev` branch to `main` and after the approval we merge them.

`Feature branch` - is just a naming convention for how you should name your branches when you create certain features. For example, you can create your branches based on the freature you are developing (auth, header, chart etc.), or even by the number of a task in your Kanban board.
