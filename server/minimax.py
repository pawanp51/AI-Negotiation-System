import random

def minimax(depth, is_maximizing_player, alpha, beta, user_price, ai_price, min_price, max_price, last_ai_price):
    # Base case: If depth is 0, difference is small, or AI price is at minimum profit threshold
    if depth == 0 or abs(ai_price - user_price) < 5 or ai_price <= min_price:
        return max(ai_price, min_price)

    if is_maximizing_player:
        max_eval = float('-inf')
        for new_price in range(max(int(ai_price * 0.95), int(min_price)), int(last_ai_price) - random.randint(5, 15), 5):
            if min_price <= new_price <= max_price:
                eval = minimax(depth - 1, False, alpha, beta, user_price, new_price, min_price, max_price, new_price)
                max_eval = max(max_eval, eval)
                alpha = max(alpha, eval)
                if beta <= alpha:
                    break
        return max_eval if max_eval != float('-inf') else min_price
    else:
        min_eval = float('inf')
        for new_price in range(max(int(ai_price * 0.95), int(min_price)), int(last_ai_price) - random.randint(5, 15), 5):
            if min_price <= new_price <= max_price:
                eval = minimax(depth - 1, True, alpha, beta, user_price, new_price, min_price, max_price, new_price)
                min_eval = min(min_eval, eval)
                beta = min(beta, eval)
                if beta <= alpha:
                    break
        return min_eval if min_eval != float('inf') else min_price

def negotiate_price(user_price, initial_price):
    min_price = initial_price * 0.85
    max_price = initial_price      
    depth = 3                     
    ai_initial_price = min(max(user_price + 50, min_price), max_price)
    return minimax(depth, True, float('-inf'), float('inf'), user_price, ai_initial_price, min_price, max_price, ai_initial_price)
