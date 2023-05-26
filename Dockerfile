FROM node:lts-alpine
ENV NODE_ENV=production
ENV MONGO_URI='mongodb+srv://abadano05:coderhouse@cluster0.c3jlm8v.mongodb.net/ecommerce?retryWrites=true&w=majority'
ENV PORT=3000
ENV CLIENT_ID_GITHUB='Iv1.a7af5df0984711e2'
ENV CLIENT_SECRET_GITHUB='6c11895d4d41cf05134d53dcfbacb0e98e84c72a'
ENV CLIENT_ID_GOOGLE='542090755566-qri1de8b20ps6u3lgc3i5r7e5jvecorb.apps.googleusercontent.com'
ENV CLIENT_SECRET_GOOGLE='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'
ENV CLIENT_ID_DISCORD='1094716464918970471'
ENV CLIENT_SECRET_DISCORD='3xXi0_1T_zlgFaXV_R0E2VbfAp38hMZ-'
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
