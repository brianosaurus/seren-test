CC = cc

hello: hello.c
	$(CC) -o hello hello.c

.PHONY: clean
clean:
	rm -f hello
