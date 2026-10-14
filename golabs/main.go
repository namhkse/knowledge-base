package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	r.Use(loggingMiddleware)

	r.HandleFunc("/books/{title}", GetBook).Methods("GET")

	r.HandleFunc("/books", CreateBook).Methods("POST")

	http.ListenAndServe(":8080", r)
}

func GetBook(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	title := vars["title"]
	fmt.Fprintf(w, "get book %s\n", title)
}

func CreateBook(w http.ResponseWriter, r *http.Request) {

	command := CreateBookCommand {
		Name: r.FormValue("name"),
	}

	fmt.Fprintf(w, "create book %s\n", command.Name)
}

type CreateBookCommand struct {
	Name 	string
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func (w http.ResponseWriter, r *http.Request) {
		log.Println(r.URL.Path)
		next.ServeHTTP(w, r)
	})
}